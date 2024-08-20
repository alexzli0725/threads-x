import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
const Thread = () => {
  const { userId, setUserId } = useContext(UserType);
  const [content, setContent] = useState("");
  const handlePostSubmit = async () => {
    const postData = {
      userId,
    };
    if (content) {
      postData.content = content;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/create-post",
        postData
      );
      setContent("");
      console.log("Post created:", response.data);
    } catch (error) {
      console.log("error creating post", error);
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <Text>Sujan</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor={"black"}
          placeholder="Type your message..."
          multiline
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button onPress={handlePostSubmit} title="Share Post" />
      </View>
    </SafeAreaView>
  );
};

export default Thread;
