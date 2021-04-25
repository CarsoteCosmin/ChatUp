import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { loggingOut } from "../config/firebase/firebaseMethods";
import { NavigationActions, StackActions } from "react-navigation";

function HomeScreen({ navigation }) {
  const resetActionLogOut = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Welcome" })],
  });
  // const [name, setName] = useState("");
  // let currentUserUID = firebase.auth().currentUser.uid;
  // console.log(currentUserUID);
  // useEffect(() => {
  //   function getUserInfo() {
  //     const doc = firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(currentUserUID)
  //       .get();

  //     if (!doc.exists) {
  //       Alert.alert("No user data found!");
  //     } else {
  //       const dataObj = doc.data();
  //       setName(dataObj.name);
  //     }
  //   }
  //   getUserInfo();
  // });

  // useEffect(() => {
  //   navigation.dispatch(resetActionLogin);
  // });

  const handlePress = () => {
    loggingOut();
    navigation.dispatch(resetActionLogOut);
  };

  return (
    <View>
      <Text>Home</Text>
      <Text>Hi </Text>
      {/* {name} */}
      <TouchableOpacity onPress={handlePress}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
