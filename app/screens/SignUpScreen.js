import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { registration } from "../config/firebase/firebaseMethods";
import Colors from "../config/Colors";
import Button from "../config/Button";

function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const emptyState = () => {
    setName("");
    setEmail("");
    setPassword("");
    // setConfirmPassword("");
  };

  const pressHandlerSignUp = () => {
    if (!name) {
      Alert.alert("Name is required");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else {
      registration(email, password, name);
      //Home
      navigation.navigate("Home");
      emptyState();
    }
  };

  const backHandler = () => {
    navigation.pop();
  };

  const pressHandlerLogin = () => {
    navigation.navigate("Login");
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
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.logoTitle}>ChatUp</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCompleteType={null}
        placeholderTextColor="white"
        autoFocus={true}
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCompleteType={null}
        placeholderTextColor="white"
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
      <Button
        width={330}
        height={55}
        borderWidth={3}
        top={15}
        borderRadius={8}
        color={Colors.signUp}
        text="SignUp"
        onPress={pressHandlerSignUp}
      />
      <View>
        <Text style={[styles.text, { top: 40 }]}>
          Already have an account?{" "}
          <Text
            style={{
              color: Colors.login,
              fontSize: 19,
            }}
            onPress={pressHandlerLogin}
          >
            Login
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
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
  text: {
    color: "white",
    fontSize: 17,
  },
});
export default SignUpScreen;
