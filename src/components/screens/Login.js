import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TextInput, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import { Image } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={{uri: 'https://res.cloudinary.com/dr8jiwn4u/image/upload/v1699846802/freshly/FreshlyLatestUpdatedLogo_xeu6q6.png'}} style={{width: 80, height: 80}} />
      <Text style={styles.title}> Freshly</Text>
      <View style={styles.inputContainer}>
        <TextInput 
        placeholder="email"
        placeholderTextColor="#000000"
        value={email}
        onChangeText={text => setEmail(text) }
        style={styles.inputText}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="password"
          placeholderTextColor="#000000"
          value={password}
          onChangeText={text => setPassword(text) }
          style={styles.inputText}
          secureTextEntry
        />
      </View>

      <View style={styles.BtnContainer}>
        <TouchableOpacity onPress={ () => { } } style={styles.btnLogin}>
          <Text style={styles.btnLoginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { } } style={styles.btnSignup}>
          <Text style={styles.BtnSignUpText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: "#E8FFCE",
      alignItems: "center",
      justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#27963C",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#76BD7D",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  BtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  btnLogin: {
    width: "100%",
    backgroundColor: "#4C8452",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  btnLoginText: {
    color: "#ffffff",
    fontSize: 14,
  },
  btnSignup: {
    marginTop: 20,
  },
  BtnSignUpText: {
    color: "000000",
    fontSize: 12,
  },
});

export default Login;