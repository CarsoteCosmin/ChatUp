import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as yup from "yup";
import { Formik } from "formik";

import Loader from "../config/Loader";
import { registration } from "../config/firebase/firebaseMethods";
import Colors from "../config/Colors";
import Button from "../config/Button";

const reviewSchema = yup.object({
  userName: yup.string().required("Name is required!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Must be a valid email!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be at least 6 charachters!"),
});

function SignUpScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const backHandler = () => {
    navigation.pop();
  };

  const pressHandlerLogin = () => {
    navigation.navigate("Login");
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
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.logoTitle}>ChatUp</Text>
        </View>
        <Formik
          initialValues={{ userName: "", email: "", password: "" }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            setLoading(true);
            registration(
              values.userName,
              values.email,
              values.password,
              navigation
            ).then(() => {
              setLoading(false);
            });
            actions.resetForm();
          }}
        >
          {(formikprops) => (
            <View style={styles.forms}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                autoCompleteType={null}
                placeholderTextColor="white"
                autoFocus={true}
                onChangeText={formikprops.handleChange("userName")}
                value={formikprops.values.userName}
                // onBlur={formikprops.handleBlur("email")}
              />
              <Text style={styles.errorTextUserName}>
                {formikprops.touched.userName && formikprops.errors.userName}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCompleteType={null}
                placeholderTextColor="white"
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
              <Button
                width={330}
                height={55}
                borderWidth={3}
                top={10}
                borderRadius={8}
                color={Colors.signUp}
                text="SignUp"
                onPress={formikprops.handleSubmit}
              />
              <View>
                <Text style={[styles.text, { top: 30 }]}>
                  Already have an account?{" "}
                  <Text
                    style={{
                      color: Colors.login,
                      fontSize: 19,
                    }}
                    onPress={pressHandlerLogin}
                  >
                    Login
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
    alignItems: "center",
  },
  forms: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: "2%",
    left: "5%",
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
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
  text: {
    color: "white",
    fontSize: 17,
  },
  errorTextUserName: {
    color: Colors.signUp,
  },
  errorTextEmail: {
    color: Colors.signUp,
  },
  errorTextPassword: {
    color: Colors.signUp,
  },
});
export default SignUpScreen;
