import * as firebase from "firebase";
import "firebase/firestore";
import { NavigationActions, StackActions } from "react-navigation";
import { Alert } from "react-native";

export async function registration(name, email, password, navigation) {
  try {
    const resetActionRegister = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })],
    });
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      name: name,
      password: password,
    });
    navigation.dispatch(resetActionRegister);
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    const resetActionLogin = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })],
    });
    await firebase.auth().signInWithEmailAndPassword(email, password);
    navigation.dispatch(resetActionLogin);
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
