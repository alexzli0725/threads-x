import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const Profile = () => {
  const [user, setUser] = useState("");
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  console.log(user);
  const logout = () => {
    clearAuthToken();
  };
  const navigation = useNavigation();
  const clearAuthToken = async () => {
    console.log("cleared")
    await AsyncStorage.removeItem("authToken");
    navigation.replace("index")
  };
  return (
    <View style={{ marginTop: 55, padding: 15 }}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user?.name}</Text>
          <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 5,
              borderRadius: 8,
              backgroundColor: "#d0d0d0",
            }}
          >
            <Text>Threads.net</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginTop: 15,
          }}
        >
          <View>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                resizeMode: "contain",
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>BTech.</Text>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              Movie Buff | Musical Nerd
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              Love Yourself
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 10, fontSize: 15, color: "gray" }}>
          {user?.followers?.length} followers
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text>Edit Profile</Text>
          </Pressable>

          <Pressable
            onPress={logout}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile;
