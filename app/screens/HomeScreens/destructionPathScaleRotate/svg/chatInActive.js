import React, { Component } from "react";
import { Animated } from "react-native";
import { Svg, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default class ChatInActiveIcon extends Component {
  constructor(props) {
    super(props);
    this.offsetValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animationOutline();
  }

  animationOutline() {
    Animated.timing(this.offsetValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }
  render() {
    const offset = this.offsetValue.interpolate({
      inputRange: [0, 1],
      outputRange: [125, 0],
    });
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24">
        <AnimatedPath
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          transform="translate(-1.42 -0.45)"
          fill="none"
          stroke="#313131"
          strokeDasharray="125"
          strokeDashoffset={offset}
          stroke-miterlimit="10"
          strokeWidth="2.5"
          origin={(24 / 2, 24 / 2)}
          scale={1}
        />
      </Svg>
    );
  }
}
