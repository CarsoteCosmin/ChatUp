import React, { Component } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default class ChatActiveIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: "none",
      scale: 1,
      rotate: "0deg",
    };
    this.offsetValue = new Animated.Value(0);
    this.scaleValue = new Animated.Value(0);
    this.rotateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animationOutline();
  }

  animationOutline() {
    Animated.timing(this.offsetValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      this.animationActive();
    });
  }
  animationActive() {
    this.setState({
      fill: "#313131",
      scale: this.scaleValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1.25, 1],
      }),
      rotate: this.rotateValue.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ["0deg", "-45deg", "45deg", "0deg"],
      }),
    });
    Animated.parallel([
      Animated.spring(this.scaleValue, {
        toValue: 2,
        useNativeDriver: true,
      }),
      Animated.timing(this.rotateValue, {
        toValue: 3,
        duration: 400,
        delay: 50,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const offset = this.offsetValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 125],
    });
    const { fill, scale, rotate } = this.state;
    return (
      <Animated.View style={{ transform: [{ scale }, { rotate }] }}>
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <AnimatedPath
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            transform="translate(-1.42 -0.45)"
            fill={fill}
            stroke="#313131"
            strokeDasharray="125"
            strokeDashoffset={offset}
            strokeWidth="2.5"
            origin={(24 / 2, 24 / 2)}
            scale={1}
          />
        </Svg>
      </Animated.View>
    );
  }
}
