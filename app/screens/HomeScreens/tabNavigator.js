import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import homeScreen from "../HomeScreens/TabScreens/homeScreen";
import profileScreen from "../HomeScreens/TabScreens/profileScreen";
import chatsScreen from "../HomeScreens/TabScreens/chatsScreen";

const Tab = createBottomTabNavigator();
function tabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Profile" component={profileScreen} />
      <Tab.Screen name="Home" component={homeScreen} />
      <Tab.Screen name="Chat" component={chatsScreen} />
    </Tab.Navigator>
  );
}

export default tabNavigator;
