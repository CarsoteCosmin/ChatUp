import { Animated } from "react-native";

var Anims = {
  firstAnim(offsetValue) {
    Animated.timing(offsetValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => console.log(offsetValue, "Done!"));
  },
};

module.exports = Anims;
