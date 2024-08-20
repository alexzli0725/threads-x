import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

const User = ({ item }) => {
  const [requestSend, setRequestSend] = useState(false);
  const sendFollow = async (currentUserId, selectedUserId) => {
    try {
      const response = await axios.post("http://localhost:3000/follow", {
        currentUserId,
        selectedUserId,
      });

      if (response.status === 200) {
        setRequestSend(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { userId, setUserId } = useContext(UserType);
  console.log(userId);
  const handleUnfollow = async (targetId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/unfollow",
        {
          loggedInUserId: userId,
          targetUserId: targetId,
        }
      );
      if (response.status === 200) {
        setRequestSend(false);
        console.log("unfollowed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <Text style={{ fontSize: 15, fontWeight: "500", flex: 1 }}>
          {item.name}
        </Text>
        {requestSend || item?.followers?.includes(userId) ? (
          <Pressable
            onPress={() => handleUnfollow(item._id)}
            style={{
              borderColor: "#d0d0d0",
              borderWidth: 1,
              padding: 10,
              marginLeft: 10,
              width: 100,
              borderRadius: 7,
              alignItems: "center",
            }}
          >
            <Text>Following</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => sendFollow(userId, item._id)}
            style={{
              borderColor: "#d0d0d0",
              borderWidth: 1,
              padding: 10,
              marginLeft: 10,
              width: 100,
              borderRadius: 7,
              alignItems: "center",
            }}
          >
            <Text>Follow</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default User;
