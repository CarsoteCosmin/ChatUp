import React, { useEffect } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";

import Colors from "../config/Colors";

function Loader(loadingState) {
  useEffect(() => {}, [loadingState.isLoading]);

  return (
    <Modal
      transparent={true}
      animationType={"fade"}
      visible={loadingState.isLoading}
      style={{ zIndex: 3 }}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loadingState.isLoading}
            color={Colors.signUp}
            size="large"
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#rgba(0, 0, 0, 0.6)",
    zIndex: 2,
  },
  activityIndicatorWrapper: {
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
  },
});

export default Loader;

// import React, { Component } from "react";
// import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
// import Colors from "./Colors";

// export default class Loader extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: this.props.isLoading,
//     };
//   }

//   static getDerivedStateFromProps(nextProps) {
//     return {
//       isLoading: nextProps.isLoading,
//     };
//   }

//   render() {
//     return (
//       <Modal
//         transparent={true}
//         animationType={"fade"}
//         visible={this.state.isLoading}
//         style={{ zIndex: 3 }}
//         onRequestClose={() => {}}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.activityIndicatorWrapper}>
//             <ActivityIndicator
//               animating={this.state.isLoading}
//               color={Colors.signUp}
//               size="large"
//             />
//           </View>
//         </View>
//       </Modal>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#rgba(0, 0, 0, 0.6)",
//     zIndex: 2,
//   },
//   activityIndicatorWrapper: {
//     borderRadius: 8,
//     display: "flex",
//     alignItems: "center",
//   },
// });
