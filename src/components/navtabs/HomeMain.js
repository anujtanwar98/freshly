import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, SafeAreaView, View, Text, Button, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';

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
            if (maxDays <= 3) {
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
        PlusJakartaSans_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        {/* <ScrollView contentContainerStyle={styles.container}> */}
        <ScrollView style={styles.container}>
        <Text style={styles.text}>My Freshly Food</Text>
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
            <View style={styles.modalCenteredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)} >
                        <Ionicons name="close-circle" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage} >
                        <Feather name="upload" size={40} color="#00B076" />
                        <Text style={styles.textStyle}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
            {/* {receiptImage && (
                <Image source={receiptImage} style={styles.image} />
            )} */}
            {/* <Button title="Pick an Image" onPress={pickImage} /> */}
            {/* <Button title="Upload Receipt" onPress={uploadReceipt} /> */}
            {/* {isLoading && <Text>Uploading...</Text>} */}
            {!isLoading && renderCategorizedItems()}
        </ScrollView>
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={() => setModalVisible(true)}>
            <Entypo name="plus" style={styles.icon} color={'#ffffff'} size={50} />
        </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#D8D8D8',
    },
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F3F3F3',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    categoryContainer: {
        marginTop: 20,
    },
    categoryTitle: {
        fontWeight: 'bold',
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
        paddingHorizontal: 8,
        marginHorizontal: 10,
    },
    categoryContainer: {
        backgroundColor: '#F3F3F3', 
        margin: 8,
        gap: 8,
        minWidth: '100%',
        // flex: 1,
      },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8, // Space below the title
        color: '#000000', // Dark text for better readability
        marginLeft: 20,
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
        elevation: 5
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
});

export default UploadReceiptScreen;
