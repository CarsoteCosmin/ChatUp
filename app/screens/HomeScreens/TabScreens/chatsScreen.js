import React from "react";
import { Text, StyleSheet, View } from "react-native";

function chatsScreen() {
  return (
    <View style={styles.container}>
      <Text>chat</Text>
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

export default chatsScreen;
