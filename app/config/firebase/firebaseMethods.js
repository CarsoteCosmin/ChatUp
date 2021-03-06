import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "firebase/firestore";
import * as firebase from "firebase";

import { registerForPushNotificationsAsync } from "../PushNotifications";

export async function registration(name, email, password, navigation) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    registerForPushNotificationsAsync().then((token) => {
      db.collection("users")
        .doc(currentUser.uid)
        .set({
          email: currentUser.email,
          name: name,
          password: password,
          id: currentUser.uid,
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/rapp-b5d38.appspot.com/o/cat-2536662_640.jpg?alt=media&token=599eb3a3-40db-42ab-9ccd-5d9731e80929",
          token: token,
          userstate: "active",
        })
        .then(() => {
          navigation.reset({
            routes: [{ name: "Tabs" }],
          });
        });
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    const userLoginData = await AsyncStorage.getItem("userLoginData");
    if (userLoginData) {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.reset({
        routes: [{ name: "Tabs" }],
      });
    } else {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const userLoginData = { email, password };
      await AsyncStorage.setItem(
        "userLoginData",
        JSON.stringify(userLoginData)
      );
      navigation.reset({
        routes: [{ name: "Tabs" }],
      });
    }
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
  // catch (err) {
  //   Alert.alert("Ceva gresit", "Bla bla bla", [
  //     {
  //       text: "OK",
  //       // onPress: () => {return false }
  //     },
  //   ]);
  // }
}

export async function loggingOut() {
  try {
    const userLoginData = { email: null, password: null };
    await firebase.auth().signOut();
    await AsyncStorage.setItem("userLoginData", JSON.stringify(userLoginData));
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
