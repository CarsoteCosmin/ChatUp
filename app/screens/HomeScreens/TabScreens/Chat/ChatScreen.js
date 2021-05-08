import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import * as firebase from "firebase";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "./styles";

function ChatScreen({ navigation }) {
  const [user, setUser] = useState();
  let obj = new Array();
  useEffect(() => {
    async function users() {
      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            obj.push(doc.data());
          });
        });
      setUser(obj);
    }
    users();
  }, []);
  return (
    <Container>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() => navigation.navigate("Messages", { name: item.name })}
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{ uri: item.avatar }} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                  <PostTime>4 mins ago</PostTime>
                </UserInfoText>
                <MessageText>ceva ceva ceva ceva</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
}

export default ChatScreen;

// const [users, setUsers] = useState();
// let obj = new Array();
// useEffect(() => {
//   async function users() {
//     await firebase
//       .firestore()
//       .collection("users")
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           obj.push(doc.data());
//         });
//       });
//     setUsers(obj);
//   }
//   users();
// }, []);
