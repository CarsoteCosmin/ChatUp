import React from "react";
import { LogBox } from "react-native";

import apiKeys from "./app/config/firebase/key";
import * as firebase from "firebase";

import Navigator from "./routes/homeStack";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function App() {
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return <Navigator />;
}
// "google-services.json":"./google-services.json"
