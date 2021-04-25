import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import Colors from "./Colors";

function Button({
  text,
  onPress,
  color,
  bottom,
  top,
  borderWidth,
  borderRadius,
  width,
  height,
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        bottom: bottom,
        top: top,
        borderRadius: borderRadius,
      }}
      onPress={onPress}
    >
      <View
        style={[
          styles.button,
          {
            width: width,
            height: height,
            borderWidth: borderWidth,
            borderColor: "white",
            borderRadius: borderRadius,
          },
        ]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

export default Button;
