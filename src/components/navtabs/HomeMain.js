import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, SafeAreaView, View, Text, Button, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import { Iconify } from 'react-native-iconify';
import { BlurView } from 'expo-blur';

const UploadReceiptScreen = () => {
    const [receiptImage, setReceiptImage] = useState(null);
    const [categorizedItems, setCategorizedItems] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ["All", "Fruits", "Vegetables", "Meat", "Seafood", "Dairy", "Bakery","Dry Goods and Pasta", "Snacks", "Sweets", "Beverages"];

    const navigation = useNavigation();

    const hasItems = () => {
        return Object.values(categorizedItems).some(categoryItems => categoryItems.length > 0);
      };      

    useFocusEffect(
        React.useCallback(() => {
          const loadCategorizedItems = async () => {
            try {
              const savedItems = await AsyncStorage.getItem('categorizedItems');
              if (savedItems !== null) {
                setCategorizedItems(JSON.parse(savedItems));
              }
            } catch (error) {
              console.error('Error loading categorized items:', error);
            }
          };
      
          loadCategorizedItems();
        }, [])
      );

    useEffect(() => {
        const loadCategorizedItems = async () => {
            try {
                const savedItems = await AsyncStorage.getItem('categorizedItems');
                if (savedItems !== null) {
                    setCategorizedItems(JSON.parse(savedItems));
                }
            } catch (error) {
                console.error('Error loading categorized items:', error);
            }
        };

        loadCategorizedItems();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setReceiptImage({ uri: result.uri });
            setModalVisible(false);
            setPreviewModalVisible(true); // Open the image preview modal
        }
    };

    const uploadReceipt = async () => {
        if (!receiptImage) {
            alert('Please select an image first');
            return;
        }
        setCategorizedItems({});
    try {
        await AsyncStorage.removeItem('categorizedItems');
    } catch (error) {
        console.error('Error clearing previous items:', error);
    }
        const formData = new FormData();
        formData.append('receipt', {
            uri: receiptImage.uri,
            name: 'receipt.jpg',
            type: 'image/jpeg', // or 'image/png'
        });

        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload-receipt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            let data = response.data;
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (parseError) {
                    console.error('Error parsing response data:', parseError);
                    setIsLoading(false);
                    return;
                }
            }

            setCategorizedItems(data);
            await AsyncStorage.setItem('categorizedItems', JSON.stringify(data));
        } catch (error) {
            console.error('Error uploading receipt: ', error);
            alert('Failed to upload receipt');
        } finally {
            setIsLoading(false);
            setPreviewModalVisible(false); // Close the modal here
        }
    };

    const filterByCategory = (category) => {
        setSelectedCategory(category);
    };
    const renderCategorizedItems = () => {
        const isValidDataStructure = Object.keys(categorizedItems).every(key => 
            Array.isArray(categorizedItems[key])
        );

        if (!isValidDataStructure) {
            console.error('Invalid data structure for categorizedItems:', categorizedItems);
            return <Text>Invalid data structure received.</Text>;
        }

        // const getFreshnessColor = (minDays, maxDays) => {
        //     // Assuming you want to base the color on the minimum freshness duration
        //     if (minDays <= 3) {
        //         return '#E41C1C'; // Red for 0-3 days
        //     } else if (minDays <= 5) {
        //         return '#F78908'; // Orange for 3-5 days
        //     } else {
        //         return '#168715'; // DarkGreen for above 5 days
        //     }
        // };               
        const getFreshnessStatus = (minDays, maxDays) => {
            if (maxDays <= 2) {
                return {
                    iconComponent: MaterialIcons,
                    iconName: 'error-outline',
                    color: '#E41C1C', // Red
                };
            } else if (maxDays <= 5) {
                return {
                    iconComponent: FontAwesome5,
                    iconName: 'eye',
                    color: '#F78908', // Orange
                };
            } else {
                return {
                    iconComponent: AntDesign,
                    iconName: 'checkcircleo',
                    color: '#168715', // DarkGreen
                };
            }
        };

        
    const filteredItems = selectedCategory === 'All' ? categorizedItems : { [selectedCategory]: categorizedItems[selectedCategory] };

        return Object.keys(filteredItems).map((category, index) => {
            if (filteredItems[category].length > 0) {
        // return Object.keys(categorizedItems).map((category, index) => {
        //     if (categorizedItems[category].length > 0) {
            return (
            <View key={index} style={styles.categoryContainer}>
                <Text style={[styles.categoryTitle,]}>{category}</Text>
                <View style={styles.itemsWrapper}>
                {categorizedItems[category].map((item, itemIndex) => (
                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('DetailScreen', { itemId: item.id, category: category })}>
                <View key={itemIndex} style={styles.itemContainer}>
                    {/* <Text style={styles.itemText}>{item.id}</Text> */}
                    <Text style={styles.emojiText}>{item.emoji}</Text>
                    <Text style={styles.itemText} numberOfLines={1}>{item.item}</Text>
                    {/* <Text style={styles.freshnessText}>Fresh for: {typeof item.freshness_duration === 'object'
                    ? `${item.freshness_duration_min}-${item.freshness_duration_max}`
                        : item.freshness_duration} days</Text> */}
                    <View style={styles.iconAndFreshnessContainer}>
                        {React.createElement(getFreshnessStatus(item.freshness_duration_min, item.freshness_duration_max).iconComponent, {
                        name: getFreshnessStatus(item.freshness_duration_min, item.freshness_duration_max).iconName,
                        size: 14,
                        color: getFreshnessStatus(item.freshness_duration_min, item.freshness_duration_max).color,
                        style: { marginRight: 5 },
                    })}
                    {/* <Text style={[styles.freshnessText, { color: getFreshnessColor(item.freshness_duration_min, item.freshness_duration_max) }]}></Text> */}
                        <Text style={[styles.freshnessText, { color: getFreshnessStatus(item.freshness_duration_min, item.freshness_duration_max).color }]} numberOfLines={1} >Fresh for {item.freshness_duration_min}-{item.freshness_duration_max} days</Text>
                    </View>
                </View>
                </TouchableOpacity>
                ))}
                </View>
            </View>
            );
            } else if (selectedCategory !== 'All') {
            return (
                <View key={index} style={styles.noItemContainer}>
                    <Text style={styles.noItemMessage}>No food item in {category} category...</Text>
                </View>
            );
        }
        return null;
      });
    };
    
    let [fontsLoaded] = useFonts({
        PlusJakartaSans_500Medium,
        PlusJakartaSans_400Regular,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
        PlusJakartaSans_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    // const getEatSoonItems = () => {
    //     const eatSoonItems = [];
    //     Object.values(categorizedItems).forEach(categoryItems => {
    //       categoryItems.forEach(item => {
    //         if (item.freshness_duration_max <= 5) {
    //           eatSoonItems.push(item);
    //         }
    //       });
    //     });
    //     return eatSoonItems.slice(0, 3); // Returns only the first 3 items
    //   };      

    const getEatSoonItems = (getAll = false) => {
        const eatSoonItems = [];
        Object.values(categorizedItems).forEach(categoryItems => {
          categoryItems.forEach(item => {
            if (item.freshness_duration_max <= 5) {
              eatSoonItems.push(item);
            }
          });
        });
      
        // This returns 3 first 3 items
        // return getAll ? eatSoonItems : eatSoonItems.slice(0, 3);
        // this returns all the items 
        return eatSoonItems;
    };      
    const getFreshnessColor = (minDays, maxDays) => {
        if (maxDays <= 2) {
            return '#E41C1C'; // Red for less than 2 days
        } else {
            return '#F78908'; // Orange for 3-5 days
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        {/* <ScrollView contentContainerStyle={styles.container}> */}
        <ScrollView style={styles.container}>
        <Text style={styles.text}>My Freshly Fridge</Text>
        <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={[styles.filterButton, selectedCategory === category && styles.selectedFilterButton]} 
                    onPress={() => hasItems() && filterByCategory(category)}
                    disabled={!hasItems()}>
                    {/* <Text style={styles.filterButtonText}>{category}</Text> */}
                    <Text style={[styles.filterButtonText, selectedCategory === category && styles.selectedFilterButtonText, !hasItems() && styles.disabledFilterButtonText]}>{category}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>
        {hasItems() && (
                <>
        <View style={styles.eatSoonBox}>
            <View style={styles.eatSoonBoxTitle}>
                <Text style={styles.eatSoonTitle}>Eat Soon</Text>
            </View>
            <View style={styles.eatSoonSeeAll}>
            <TouchableOpacity onPress={() => navigation.navigate('EatSoon', { eatSoonItems: getEatSoonItems(true) })}>
                    <Text style={styles.eatSoonSeeAllTitle}>See All <AntDesign name="right" size={16} color="#616774" /></Text>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {getEatSoonItems().map((item, index) => (
            // <Text key={index}>{item.item} - {item.freshness_duration_max} days left</Text>
            // <View key={index}>
            //     <Text>{item.emoji}</Text>
            //     <Text numberOfLines={1}>{item.item}</Text>
            //     <Text>Fresh for: {item.freshness_duration_min}-{item.freshness_duration_max} days</Text>
            // </View>
            <View key={index} style={styles.eat_soon_container}>
            <View style={styles.eat_soon_circle}>
              <Text style={styles.eat_soon_emoji}>{item.emoji}</Text>
              <Text style={[styles.eat_soon_subText_Red,  { color: getFreshnessColor(item.freshness_duration_min, item.freshness_duration_max) }]}>{item.freshness_duration_min}-{item.freshness_duration_max} days</Text>
            </View>
            <Text numberOfLines={1} style={styles.eat_soon_mainText}>{item.item}</Text>
          </View>
        ))}
        </ScrollView>
        </>
        )}
        {!hasItems() && (
            <View style={styles.noItemContainer}>
                <Image source={require('../../../assets/fridge_empty.png')} />
                <Text style={styles.noItemMessage}>Fridge Empty</Text>
                <Text style={styles.noItemSecondMessage}>After your next grocery trip, add your receipt to fill your freshly fridge!</Text>
            </View>
        )}
        <Modal
        animationType="slide"
        transparent={true}
        visible={previewModalVisible}
        onRequestClose={() => {
          setPreviewModalVisible(!previewModalVisible);
        }}>
            <View style={styles.centeredView}>
                <View style={styles.previewModalView}>
                    {/* {isLoading ? (
                        <View style={styles.uploadingContainer}>
                        <ActivityIndicator size="large" color="#168715" />
                    </View>    
                    ) : (
                        <> */}
                    {receiptImage && (
                    <Image source={receiptImage} style={styles.previewImage} />
                    )}
                {/* <Image source={{ uri: selectedImage }} style={styles.previewImage} /> */}
                {isLoading ? (
                        <View style={styles.uploadingContainer}>
                        <ActivityIndicator size="large" color="#168715" />
                    </View>    
                    ) : (
                    <View style={styles.previewButtonContainer}>
                    <TouchableOpacity style={styles.previewButtonCancel} onPress={() => setPreviewModalVisible(false)} >
                        <Text style={styles.previewButtonCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.uploadReceiptButton} onPress={uploadReceipt} >
                        <Text style={styles.uploadReceiptButtonText} >Upload Receipt</Text>
                    </TouchableOpacity>
                    </View>
                    // </>
                )}
              </View>
            </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }} >
        <BlurView intensity={10} style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(16, 20, 15, 0.1)' }]}>
            <View style={styles.modalCenteredView}>
                <View style={styles.modalView}>
                    {/* <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)} >
                        <Ionicons name="close-circle" size={30} color="black" />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.file} onPress={pickImage} >
                        <View style={styles.mainFileText}>
                            <Text style={styles.textStyle}>Upload</Text>
                        </View>
                        <View style={styles.mainFileIcon}>
                            <Feather name="upload" size={30} color="#168715" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.file} >
                        <View style={styles.mainFileText}>
                            <Text style={styles.textStyle}>Scan</Text>
                        </View>
                        <View style={styles.mainFileIcon}>
                            <Iconify icon="icon-park-outline:scanning-two" size={30} color='#168715' />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.closeModalButton, styles.closeButton]} onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons name="close" style={styles.icon} color={'#ffffff'} size={50} />
                </TouchableOpacity>
            </View>
            </BlurView>
        </Modal>
            {/* {receiptImage && (
                <Image source={receiptImage} style={styles.image} />
            )} */}
            {/* <Button title="Pick an Image" onPress={pickImage} /> */}
            {/* <Button title="Upload Receipt" onPress={uploadReceipt} /> */}
            {/* {isLoading && <Text>Uploading...</Text>} */}
            {!isLoading && renderCategorizedItems()}
        {/* {modalVisible && (
            <BlurView intensity={10} style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(16, 20, 15, 0.1)' }]}>
            </BlurView>
        )} */}
        </ScrollView>
        {!modalVisible && (
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={() => setModalVisible(true)}>
            <Entypo name="plus" style={styles.icon} color={'#ffffff'} size={50} />
        </TouchableOpacity>
        )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FBFBFB',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    categoryContainer: {
        marginTop: 20,
    },
    itemText: {
        marginLeft: 10,
    },
    itemContainer: {
        gap: 8,
        // height: 120,
        minHeight: 120,
        // marginTop: 15,
        marginBottom: 16,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        maxWidth: 170,
        minWidth: 170,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        display: 'flex',
        flexDirection: 'column',
    },
    iconAndFreshnessContainer: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Align items vertically in the center
    },
    itemsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // paddingHorizontal: 8,
        // marginHorizontal: 10,
    },
    categoryContainer: {
        backgroundColor: '#FBFBFB', 
        margin: 8,
        gap: 8,
        minWidth: '100%',
        // flex: 1,
      },
    categoryTitle: {
        fontSize: 16,
        marginBottom: 8,
        color: '#163C16',
        marginLeft: 10,
        fontFamily: 'PlusJakartaSans_700Bold',
    },
      emojiText: {
        fontSize: 30, // Larger size for emoji for visibility
        marginRight: 10, // Space after the emoji
        marginTop: 10,
    },
    itemText: {
        // flex: 1,
        fontSize: 14,
        color: '#000000',
        flexShrink: 1,
        flexWrap: 'wrap', 
        overflow: 'hidden',
        // marginTop: 5,
        fontFamily: 'PlusJakartaSans_600SemiBold',
    },
    freshnessText: {
        fontSize: 12,
        color: '#000000',
        flexShrink: 1,
        flexWrap: 'wrap', 
        overflow: 'hidden',
        fontFamily: 'PlusJakartaSans_600SemiBold',
    },
    text: {
        color: '#168715',
        fontSize: 24,
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 16,
        paddingHorizontal: 20,
        fontFamily: 'PlusJakartaSans_800ExtraBold',
    },
    button: {
        backgroundColor: '#BDFFBE',
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#168715',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 40, 
        width: 80, 
        height: 80,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalCenteredView: {
        position: 'absolute', // Position the view absolutely
        bottom: 150, // Adjust this value as needed to position the modal above the button
        right: 10, // Adjust this value as needed for horizontal alignment
        justifyContent: "flex-end", // Align content at the bottom
        alignItems: "flex-end", // Align content on the right
        right: -20,
    },
    buttonClose: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
    },
    modalView: {
        margin: 20,
        // backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        right: -20,
    },
    previewImage: {
        width: 400,
        height: 600,
        resizeMode: 'contain',
    },
    previewModalView: {
        margin: 20,
        backgroundColor: "#ffffff",
        // borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        //   elevation: 5,
    },
    previewButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },
    previewButtonCancel: {
        backgroundColor: "#808B9F",
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    uploadReceiptButton: {
        backgroundColor: '#7CC106', // Blue color
        padding: 10,
        borderRadius: 20,
    },
    uploadReceiptButtonText: {
        color: '#ffffff',
        fontSize: 16,
        padding: 5,
    },
    previewButtonCancelText: {
        color: '#ffffff',
        fontSize: 16,
        padding: 5,
    },
    filterContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    filterButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e9e9e9',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 14,
        marginHorizontal: 5,
    },
    filterButtonText: {
        color: '#163C16',
        fontSize: 14,
        fontFamily: 'PlusJakartaSans_600SemiBold',
    },
    selectedFilterButton: {
        backgroundColor: '#168715', // Green background color for selected button
    },
    selectedFilterButtonText: {
        color: '#ffffff', // Light green text color for selected button
    },
    noItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    noItemMessage: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_600SemiBold',
    },
    disabledFilterButton: {
        backgroundColor: '#e0e0e0', // Example disabled background color
        borderColor: '#cccccc', // Example disabled border color
    },
    disabledFilterButtonText: {
        color: '#a0a0a0', // Example disabled text color
    }, 
    eatSoonBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    eatSoonTitle: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_700Bold',
        color: '#163C16',
    },
    eatSoonSeeAllTitle: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_600SemiBold',
        color: '#616774',
    },
    noItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 90,
    },
    noItemMessage: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans_700Bold',
        color: '#163C16',
        letterSpacing: .2,
    },
    noItemSecondMessage: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_500Medium',
        color: '#163C16',
        textAlign: 'center',
        maxWidth: 300,
        marginTop: 24,
        lineHeight: 24,
        letterSpacing: .2,
    },
    closeModalButton: {
        backgroundColor: '#BDFFBE',
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#168715',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -50,
        right: 40,
        borderRadius: 40, 
        width: 80, 
        height: 80,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    file: {
        // backgroundColor: '#ffffff',
        // padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // margin: 10,
    },
    textStyle: {
        color: '#163C16',
        fontSize: 16,
        fontFamily: 'PlusJakartaSans_600SemiBold',
        minWidth: 80,
        padding: 5,
    },
    mainFileText: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginRight: -10,
    },
    mainFileIcon: {
        backgroundColor: '#ffffff',
        // padding: 10,
        borderRadius: 100,
        width: 72,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        right: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
    },
    eat_soon_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    eat_soon_circle: {
        width: 109,
        height: 109,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        position: 'relative',
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
    },
    eat_soon_emoji: {
        fontSize: 30,
    },
    eat_soon_subText_Red: {
        position: 'absolute',
        bottom: 10,
        fontSize: 16,
        color: '#E41C1C',
        fontFamily: 'PlusJakartaSans_600SemiBold',
    },
    eat_soon_mainText: {
        marginTop: 5,
        fontSize: 14,
        color: '#163C16',
        fontFamily: 'PlusJakartaSans_600SemiBold',
        marginBottom: 10,
        maxWidth: 100,
    },
});

export default UploadReceiptScreen;
