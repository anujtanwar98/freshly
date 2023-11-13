import React, { useState } from 'react';
import {
SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TextInput, TouchableOpacity, } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import { Image } from 'react-native';

const Login = () => {
    const onPressLogin = () => {
      // Do something about login operation
    };
    const onPressForgotPassword = () => {
      // Do something about forgot password operation
    };
    const onPressSignUp = () => {
      // Do something about signup operation
    };
    const [state, setState] = useState({
      email: "",
      password: "",
    });
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://res.cloudinary.com/dr8jiwn4u/image/upload/v1699846802/freshly/FreshlyLatestUpdatedLogo_xeu6q6.png'}} style={{width: 80, height: 80}} />
        <Text style={styles.title}> Freshly</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState({ password: text })}
          />
        </View>
        <TouchableOpacity onPress={onPressForgotPassword}>
          <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSignUp}>
          <Text style={styles.forgotAndSignUpText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#BCFFAF",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#fb5b5a",
      marginBottom: 40,
    },
    inputView: {
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
      color: "white",
    },
    forgotAndSignUpText: {
      color: "black",
      fontSize: 11,
    },
    loginBtn: {
      width: "80%",
      backgroundColor: "#4C8452",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: 10,
    },
});

export default Login;