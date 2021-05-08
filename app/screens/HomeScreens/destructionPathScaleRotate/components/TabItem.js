import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import chatActive from "../svg/chatActive";
import chatInActive from "../svg/chatInActive";
import cameraActive from "../svg/camerActive";
import cameraInActive from "../svg/camerInActive";
import homeActive from "../svg/homeActive";
import homeInActive from "../svg/homeInActive";
import likesActive from "../svg/likesActive";
import likesInActive from "../svg/likesInActive";
import profileActive from "../svg/profileActive";
import profileInActive from "../svg/profileInActive";

const tabBarIcons = {
  active: {
    Chat: chatActive,
    Camera: cameraActive,
    Home: homeActive,
    Likes: likesActive,
    Profile: profileActive,
  },
  inactive: {
    Chat: chatInActive,
    Camera: cameraInActive,
    Home: homeInActive,
    Likes: likesInActive,
    Profile: profileInActive,
  },
};

class TabItem extends Component {
  hndPress = () => {
    this.props.navigation.navigate(this.props.name);
  };
  render() {
    const { name, isActive, label } = this.props;
    const Geticons = tabBarIcons[isActive ? "active" : "inactive"][name];
    let ShowLabel;
    if (label == true) {
      ShowLabel = name;
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.hndPress} style={styles.button}>
          <View style={{ alignItems: "center", paddingTop: 12 }}>
            <Geticons />
            <Text>{ShowLabel}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default TabItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
