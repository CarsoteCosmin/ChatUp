import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";
// import { registerForPushNotificationsAsync } from "../PushNotifications";

export async function registration(name, email, password, navigation) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    // const token = registerForPushNotificationsAsync();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      name: name,
      password: password,
      id: currentUser.uid,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/rapp-b5d38.appspot.com/o/cat-2536662_640.jpg?alt=media&token=599eb3a3-40db-42ab-9ccd-5d9731e80929",
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
