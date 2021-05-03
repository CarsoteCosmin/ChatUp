// import React, { Component } from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default class FeedScreen extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={{ color: "#fff" }}>Feed Screen</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#394a6d",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { loggingOut } from "../../../../config/firebase/firebaseMethods";

export default function FeedScreen() {
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
