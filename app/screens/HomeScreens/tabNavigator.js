import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import homeScreen from "../HomeScreens/TabScreens/homeScreen";
import profileScreen from "../HomeScreens/TabScreens/profileScreen";
import chatsScreen from "../HomeScreens/TabScreens/chatsScreen";
import Colors from "../../config/Colors";

const Tab = createBottomTabNavigator();
function tabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Colors.login,
        inactiveTintColor: Colors.background,
      }}
    >
      <Tab.Screen
        name="Chat"
        component={chatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="comment" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={homeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default tabNavigator;
