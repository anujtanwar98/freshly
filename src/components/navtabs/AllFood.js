import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


const HomeMain = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    console.log("Icon button pressed!");
    setModalVisible(true);
    // Add your logic here for what should happen when the button is pressed
  };
  return (
    // <SafeAreaView style={styles.mainWrapper}>
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>My Food 🍱</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Ionicons style={styles.icon} name="add-circle" color={'#FFA197'} size={30} />
          <Text style={styles.AddText}>Add Food</Text>
        </TouchableOpacity>
      </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
              <Ionicons name="ios-camera" size={40} color={'#009359'} />
            <Text>Camera</Text>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="ios-receipt" size={40} color="#00B076" />
              <Text style={styles.textStyle}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: '#00A2D6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    color: '#000',
    fontSize: 26,
    alignItems: 'center',
  },
  AddText: {
    color: '#000',
    fontSize: 14,
    alignItems: 'center',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#BDFFBE',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
})

export default HomeMain;