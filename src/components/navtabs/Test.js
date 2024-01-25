import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, SafeAreaView, View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons';

const UploadReceiptScreen = () => {
    const [receiptImage, setReceiptImage] = useState(null);
    const [categorizedItems, setCategorizedItems] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

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
        }
    };

    const renderCategorizedItems = () => {
        const isValidDataStructure = Object.keys(categorizedItems).every(key => 
            Array.isArray(categorizedItems[key])
        );

        if (!isValidDataStructure) {
            console.error('Invalid data structure for categorizedItems:', categorizedItems);
            return <Text>Invalid data structure received.</Text>;
        }

        return Object.keys(categorizedItems).map((category, index) => {
            if (categorizedItems[category].length > 0) {
            return (
            <View key={index} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <View style={styles.itemsWrapper}>
                {categorizedItems[category].map((item, itemIndex) => (
                <View key={itemIndex} style={styles.itemContainer}>
                    <Text style={styles.emojiText}>{item.emoji}</Text>
                    <Text style={styles.itemText}>{item.item}</Text>
                    {/* <Text style={styles.freshnessText}>Fresh for: {typeof item.freshness_duration === 'object'
                    ? `${item.freshness_duration_min}-${item.freshness_duration_max}`
                        : item.freshness_duration} days</Text> */}
                        <Text style={styles.freshnessText}>Fresh for: {item.freshness_duration_min} - {item.freshness_duration_max} days</Text>
                </View>
                ))}
                </View>
            </View>
            );
        }
        return null;
      });
    };    

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>My Freshly Food 🛒</Text>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Button title="Upload" onPress={pickImage} />
                    {/* ...other buttons like 'Scan' can go here... */}
                    <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
                </View>
            </View>
        </Modal>
            {receiptImage && (
                <Image source={receiptImage} style={styles.image} />
            )}
            {/* <Button title="Pick an Image" onPress={pickImage} /> */}
            <Button title="Upload Receipt" onPress={uploadReceipt} />
            {isLoading && <Text>Uploading...</Text>}
            {!isLoading && renderCategorizedItems()}
        </ScrollView>
        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={() => setModalVisible(true)}>
            <Entypo name="plus" style={styles.icon} color={'#000000'} size={50} />
        </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 100,
        marginTop: 15,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        maxWidth: 170,
        minWidth: 170,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
        color: '#20821E', // Dark text for better readability
        marginLeft: 20,
      },
      emojiText: {
        fontSize: 24, // Larger size for emoji for visibility
        marginRight: 10, // Space after the emoji
      },
      itemText: {
        flex: 1, // Takes up remaining space to push the freshness text to the end
        fontSize: 16, // Readable text size
        color: '#000000', // Dark text for better readability
      },
      freshnessText: {
        fontSize: 14, // Slightly smaller text size
        color: '#000000', // Lighter text color for secondary information
      },
      text: {
        color: '#7CC106',
        fontSize: 24,
        fontWeight: 'bold',
        flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
        backgroundColor: '#BDFFBE',
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
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
});

export default UploadReceiptScreen;
