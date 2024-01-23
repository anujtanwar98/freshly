import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UploadReceiptScreen = () => {
    const [receiptImage, setReceiptImage] = useState(null);
    const [categorizedItems, setCategorizedItems] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
        }
    };

    const uploadReceipt = async () => {
        if (!receiptImage) {
            alert('Please select an image first');
            return;
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
            console.log('Received data:', response.data); // Log the data
            console.log('Type of received data:', typeof response.data); // Check the type
    
            let data = response.data;
            if (typeof data === 'string') {
                // Parse the string to JSON if necessary
                try {
                    data = JSON.parse(data);
                } catch (parseError) {
                    console.error('Error parsing response data:', parseError);
                    setIsLoading(false);
                    return;
                }
            }
    
            setCategorizedItems(data);
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

        return Object.keys(categorizedItems).map((category, index) => (
            <View key={index} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category}</Text>
                {categorizedItems[category].map((item, itemIndex) => (
                <View key={itemIndex} style={styles.itemContainer}>
                    <Text style={styles.emojiText}>{item.emoji}</Text>
                    <Text style={styles.itemText}>{item.item}</Text>
                  </View>
                ))}
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            {receiptImage && (
                <Image source={receiptImage} style={styles.image} />
            )}
            <Button title="Pick an Image" onPress={pickImage} />
            <Button title="Upload Receipt" onPress={uploadReceipt} />
            {isLoading && <Text>Uploading...</Text>}
            {!isLoading && renderCategorizedItems()}
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
});

export default UploadReceiptScreen;
