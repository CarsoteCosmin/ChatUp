import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";

import Colors from "../config/Colors";
import Button from "../config/Button";

function WelcomeScreen({ navigation }) {
  const pressHandlerLogin = () => {
    navigation.navigate("Login");
  };
  const pressHandlerSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <ImageBackground style={styles.background}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.LogoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.logoTitle}>ChatUp</Text>
      </View>
      <Button
        width={300}
        height={55}
        borderWidth={3}
        bottom={85}
        borderRadius={8}
        color={Colors.login}
        text="Login"
        onPress={pressHandlerLogin}
      />
      <Button
        width={300}
        height={55}
        borderWidth={3}
        borderRadius={8}
        bottom={65}
        color={Colors.signUp}
        text="Sign Up"
        onPress={pressHandlerSignUp}
      />
      <StatusBar style={{ backgroundColor: "white" }} />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 100,
  },
  logoTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 4,
  },
  LogoContainer: {
    position: "absolute",
    top: "30%",
    alignItems: "center",
  },
  title: {
    top: "5%",
    position: "absolute",
    color: "white",
    fontSize: 45,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  button: {
    borderColor: "white",
    borderWidth: 2,
  },
});

export default WelcomeScreen;
