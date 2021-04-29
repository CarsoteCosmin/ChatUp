import React, { useState } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as yup from "yup";
import { Formik } from "formik";

import Loader from "../config/Loader";
import Button from "../config/Button";
import Colors from "../config/Colors";
import { signIn } from "../config/firebase/firebaseMethods";

const reviewSchema = yup.object({
  email: yup
    .string()
    .required("Email is required!")
    .email("Must be a valid email!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be at least 6 charachters!"),
});

function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const backHandler = () => {
    navigation.pop();
  };

  const pressHandlerSignUp = () => {
    navigation.navigate("SignUp");
  };

  const pressHandlerForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.background}>
        <FontAwesome5
          onPress={backHandler}
          style={styles.icon}
          color="white"
          size={30}
          name={"arrow-left"}
        />
        <View style={styles.LogoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <Text style={styles.logoTitle}>ChatUp</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            setLoading(true);
            signIn(values.email, values.password, navigation).then(() => {
              setLoading(false);
            });
            actions.resetForm();
          }}
        >
          {(formikprops) => (
            <View style={styles.forms}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCompleteType={null}
                placeholderTextColor="white"
                autoFocus={true}
                onChangeText={formikprops.handleChange("email")}
                value={formikprops.values.email}
                // onBlur={formikprops.handleBlur("email")}
              />
              <Text style={styles.errorTextEmail}>
                {formikprops.touched.email && formikprops.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                autoCompleteType={null}
                placeholderTextColor="white"
                secureTextEntry={true}
                onChangeText={formikprops.handleChange("password")}
                value={formikprops.values.password}
                // onBlur={formikprops.handleBlur("password")}
              />
              <Text style={styles.errorTextPassword}>
                {formikprops.touched.password && formikprops.errors.password}
              </Text>
              <Text
                onPress={pressHandlerForgotPassword}
                style={[
                  styles.text,
                  { textDecorationLine: "underline", top: 0 },
                ]}
              >
                Forgot your password?
              </Text>
              <Button
                width={330}
                height={55}
                borderWidth={3}
                top={15}
                borderRadius={8}
                color={Colors.login}
                text="Login"
                onPress={formikprops.handleSubmit}
              />
              <View>
                <Text style={[styles.text, { top: 40 }]}>
                  Don't have an account?{" "}
                  <Text
                    style={{
                      color: Colors.signUp,
                      fontSize: 19,
                    }}
                    onPress={pressHandlerSignUp}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
              <Loader isLoading={loading} />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "center",
  },
  forms: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: "white",
    height: 60,
    padding: 10,
    margin: 4,
    width: 330,
    borderRadius: 8,
    fontSize: 22,
    color: "white",
  },
  logo: {
    width: 110,
    height: 100,
  },
  LogoContainer: {
    bottom: "1%",
    alignItems: "center",
  },
  logoTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 4,
  },
  text: {
    color: "white",
    fontSize: 17,
  },
  errorTextEmail: {
    color: Colors.signUp,
  },
  errorTextPassword: {
    color: Colors.signUp,
  },
});
export default LoginScreen;
