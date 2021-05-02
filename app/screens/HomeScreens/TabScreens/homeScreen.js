import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { loggingOut } from "../../../config/firebase/firebaseMethods";

function homeScreen({ navigation }) {
  const [name, setName] = useState("");
  let currentUserUID = firebase.auth().currentUser.uid;
  useEffect(() => {
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
      }
    }
    userData();
  }, []);

  const handlePress = () => {
    loggingOut();
    navigation.reset({
      routes: [{ name: "Welcome" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Hi {name}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default homeScreen;
