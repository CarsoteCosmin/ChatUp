import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { NavigationActions, StackActions } from "react-navigation";

import Colors from "../config/Colors";

function LoadingScreen({ navigation }) {
  const resetActionLogin = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Home" })],
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        navigation.dispatch(resetActionLogin);
      } else {
        navigation.navigate("Login");
      }
    });
    // return () => {
    // };
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.signUp} size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "center",
  },
});

export default LoadingScreen;
