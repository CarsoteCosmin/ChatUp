import React from "react";
// import { Easing } from "react-native";
import {
  createStackNavigator,
  // TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import loginScreen from "../app/screens/loginScreen";
import signUpScreen from "../app/screens/signUpScreen";
import welcomeScreen from "../app/screens/welcomeScreen";
import forgotPasswordScreen from "../app/screens/forgotPasswordScreen";
import tabNavigator from "../app/screens/HomeScreens/tabNavigator";

const Stack = createStackNavigator();

function homeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // transitionSpec: { open: config, close: config },
        }}
        initialRouteName="Welcome"
        animation="fade"
      >
        <Stack.Screen
          name="Welcome"
          component={welcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={loginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={signUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={forgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={tabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
export default homeStack;
