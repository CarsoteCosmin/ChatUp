// @refresh reset
import React, { useState, useEffect, useCallback } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { View } from "react-native";

import * as firebase from "firebase";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from "../../../../config/Colors";
import { PushNotifications } from "../../../../config/PushNotifications";

export default function MessagesScreen(route) {
  const [user, setUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [id, setId] = useState();
  const [userState, setUserState] = useState();
  const db = firebase.firestore();
  const chatsRef = db.collection("chats");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    otherUserData();
    userData();
    const unsubscribe = chatsRef
      .doc(id)
      .collection("messages")
      .onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type === "added")
          .map(({ doc }) => {
            const message = doc.data();
            return { ...message, createdAt: message.createdAt.toDate() };
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        appendMessages(messagesFirestore);
      });
    return () => unsubscribe();
  }, [id]);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  function userData() {
    const currentUserUID = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(currentUserUID)
      .get()
      .then((doc) => {
        const name = doc.data().name;
        const _id = doc.data().id;
        const avatar = doc.data().avatar;
        const user = { name, _id, avatar };
        setUser(user);
      });
  }

  function otherUserData() {
    firebase
      .firestore()
      .collection("users")
      .where("name", "==", route.route.params.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const name = doc.data().name;
          const _id = doc.data().id;
          const avatar = doc.data().avatar;
          const token = doc.data().token;
          const otherUser = { name, _id, avatar, token };
          const id1 = otherUser._id + firebase.auth().currentUser.uid;
          const id2 = firebase.auth().currentUser.uid + otherUser._id;
          if (id1.localeCompare(id2) > 0) {
            setId(id1);
          } else {
            setId(id2);
          }
          setOtherUser(otherUser);
        });
      });
  }

  async function handleSend(messages) {
    chatsRef.doc(id).set({
      idSender: firebase.auth().currentUser.uid,
      idReciver: otherUser._id,
    });
    const writes = messages.map((m) =>
      chatsRef.doc(id).collection("messages").add(m)
    );
    await Promise.all(writes);
    firebase
      .firestore()
      .collection("users")
      .where("name", "==", route.route.params.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserState(doc.data().userState);
        });
      });
    PushNotifications(otherUser.token, messages, userState);
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <FontAwesome5
            name="arrow-right"
            style={{ marginBottom: 10, marginRight: 10 }}
            size={25}
            color="black"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "black",
          },
          left: {
            backgroundColor: "white",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome5 name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={{ backgroundColor: Colors.background, flex: 1 }}>
      <GiftedChat
        messages={messages}
        user={user}
        onSend={handleSend}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
}
