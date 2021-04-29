import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../app/screens/LoginScreen";
import SignUpScreen from "../app/screens/SignUpScreen";
import WelcomeScreen from "../app/screens/WelcomeScreen";
import ForgotPasswordScreen from "../app/screens/ForgotPasswordScreen";
import HomeScreen from "../app/screens/HomeScreen";

const screens = {
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);
