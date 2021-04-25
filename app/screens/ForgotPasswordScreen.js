import React from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from "../config/Colors";

function ForgotPasswordScreeen({ navigation }) {
  const backHandler = () => {
    navigation.pop();
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
      <View>
        <Text style={styles.text}>ForgotPassword</Text>
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
  text: {
    color: "white",
  },
  icon: {
    position: "absolute",
    top: "2%",
    left: "5%",
  },
});
export default ForgotPasswordScreeen;
