import React, { useEffect, useState, useRef } from "react";
import { View, Text, Alert, StyleSheet, AppState } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as firebase from "firebase";

import { loggingOut } from "../../../config/firebase/firebaseMethods";

export default function HomeScreen({ navigation }) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [name, setName] = useState("");
  const currentUserUID = firebase.auth().currentUser.uid;
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userState();
      }
    });
    userData();
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [appStateVisible]);

  async function userState() {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .set(
        {
          userstate: appStateVisible,
        },
        { merge: true }
      );
  }

  const _handleAppStateChange = (nextAppState) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  async function userData() {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(currentUserUID)
      .get();
    if (!doc.exists) {
      Alert.alert("No user data found!");
    } else {
      const dataObj = doc.data();
      setName(dataObj.name);

      const email = dataObj.email;
      const password = dataObj.password;
      const userLoginData = { email, password };
      await AsyncStorage.setItem(
        "userLoginData",
        JSON.stringify(userLoginData)
      );
    }
  }

  const handlePress = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        userstate: "background",
      });
    loggingOut();
    navigation.reset({
      routes: [{ name: "Welcome" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Home</Text>
      <Text style={{ color: "white" }}>Hi {name}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: "white" }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2b2d",
    alignItems: "center",
    justifyContent: "center",
  },
});
