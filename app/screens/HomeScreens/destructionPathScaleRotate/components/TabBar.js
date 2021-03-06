import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import TabItem from "./TabItem";

function TabBar({ navigation, state }) {
  const index = state.index;
  const routes = state.routes;
  return (
    <SafeAreaView>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-around",
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
      >
        {
          // routes.map((route, i) => (
          //   <TabItem
          //     navigation={navigation}
          //     key={route.name}
          //     {...route}
          //     isActive={index === i}
          //     label={false}
          //   />
          // ))
          routes.map((route, i) => (
            <TabItem
              navigation={navigation}
              key={route.name}
              {...route}
              isActive={index === i}
              label={false}
            />
          ))
        }
      </View>
    </SafeAreaView>
  );
}

export default TabBar;
