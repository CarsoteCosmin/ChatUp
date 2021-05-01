import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(name, email, password, navigation) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      name: name,
      password: password,
    });
    navigation.reset({
      routes: [{ name: "Tabs" }],
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    navigation.reset({
      routes: [{ name: "Tabs" }],
    });
  } catch (err) {
    Alert.alert("Ceva gresit", "Bla bla bla", [
      {
        text: "OK",
        // onPress: () => {return false }
      },
    ]);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
