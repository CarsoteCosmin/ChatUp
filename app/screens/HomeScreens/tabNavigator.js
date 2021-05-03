import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedScreen from "../HomeScreens/TabScreens/screen/FeedScreen";
import SearchScreen from "../HomeScreens/TabScreens/screen/SearchScreen";
import ProfilScreen from "../HomeScreens/TabScreens/screen/ProfilScreen";
import CameraScreen from "../HomeScreens/TabScreens/screen/CameraScreen";
import LikesScreen from "../HomeScreens/TabScreens/screen/LikesScreen";

import TabBar from "./destructionPathScaleRotate/components/TabBar";
const Tab = createBottomTabNavigator();
function tabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="Feed"
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default tabNavigator;
