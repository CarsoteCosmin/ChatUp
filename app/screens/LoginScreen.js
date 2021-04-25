import React, { useState } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Button from "../config/Button";
import Colors from "../config/Colors";
import { signIn } from "../config/firebase/firebaseMethods";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandlerLogin = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }
    if (!password) {
      Alert.alert("Password field is required.");
    }
    signIn(email, password);
    navigation.navigate("Loading");
    setEmail("");
    setPassword("");
  };

  const backHandler = () => {
    navigation.pop();
  };

  const pressHandlerSignUp = () => {
    navigation.navigate("SignUp");
  };

  const pressHandlerForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <SafeAreaView style={styles.background}>
      <FontAwesome5
        onPress={backHandler}
        style={styles.icon}
        color="white"
        size={30}
        name={"arrow-left"}
      />
      <View style={styles.LogoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.logoTitle}>ChatUp</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCompleteType={null}
        placeholderTextColor="white"
        autoFocus={true}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCompleteType={null}
        placeholderTextColor="white"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />
      <Text
        onPress={pressHandlerForgotPassword}
        style={[styles.text, { textDecorationLine: "underline", top: 10 }]}
      >
        Forgot your password?
      </Text>
      <Button
        width={330}
        height={55}
        borderWidth={3}
        top={25}
        borderRadius={8}
        color={Colors.login}
        text="Login"
        onPress={pressHandlerLogin}
      />
      <View>
        <Text style={[styles.text, { top: 40 }]}>
          Don't have an account?{" "}
          <Text
            style={{
              color: Colors.signUp,
              fontSize: 19,
            }}
            onPress={pressHandlerSignUp}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: "2%",
    left: "5%",
  },
  input: {
    borderWidth: 2,
    borderColor: "white",
    height: 60,
    padding: 10,
    margin: 10,
    width: 330,
    borderRadius: 8,
    fontSize: 22,
    color: "white",
  },
  logo: {
    width: 110,
    height: 100,
  },
  LogoContainer: {
    bottom: "4%",
    alignItems: "center",
  },
  logoTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 4,
  },
  text: {
    color: "white",
    fontSize: 17,
  },
});
export default LoginScreen;
