import React from "react";
import * as firebase from "firebase";
import apiKeys from "./app/config/firebase/key";
import {} from "react-native";
import { LogBox } from "react-native";

import Navigator from "./routes/homeStack";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function App() {
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
  return <Navigator />;
}
