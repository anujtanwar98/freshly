import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UploadReceiptScreen = () => {
    const [receiptImage, setReceiptImage] = useState(null);
    const [categorizedItems, setCategorizedItems] = useState('');
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
        // formData.append('receipt', {
        //     uri: receiptImage.uri,
        //     type: 'image/jpeg', // or 'image/png'
        //     name: 'receipt.jpg',
        // });
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
            setCategorizedItems(response.data);
        } catch (error) {
            console.error('Error uploading receipt: ', error);
            alert('Failed to upload receipt');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {receiptImage && (
                <Image source={receiptImage} style={styles.image} />
            )}
            <Button title="Pick an Image" onPress={pickImage} />
            <Button title="Upload Receipt" onPress={uploadReceipt} />
            {isLoading && <Text>Uploading...</Text>}
            {categorizedItems && (
                <View style={styles.result}>
                    <Text style={styles.resultText}>{categorizedItems}</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    result: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resultText: {
        textAlign: 'center',
    },
});

export default UploadReceiptScreen;
