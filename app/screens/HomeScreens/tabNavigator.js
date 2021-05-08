import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import ChatScreen from "../HomeScreens/TabScreens/Chat/ChatScreen";
import MessagesScreen from "../HomeScreens/TabScreens/Chat/MessagesScreen";

import CameraScreen from "../HomeScreens/TabScreens/CameraScreen";
import HomeScreen from "../HomeScreens/TabScreens/HomeScreen";
import LikesScreen from "../HomeScreens/TabScreens/LikesScreen";
import ProfileScreen from "../HomeScreens/TabScreens/ProfileScreen";

import TabBar from "./destructionPathScaleRotate/components/TabBar";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const chatStack = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="Chat"
      component={ChatScreen}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: route.params.name,
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
      })}
      name="Messages"
      component={MessagesScreen}
    />
  </Stack.Navigator>
);

function tabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen name="Chat" component={chatStack} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default tabNavigator;
