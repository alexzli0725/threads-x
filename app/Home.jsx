import { View, Text, ScrollView, Image, SafeAreaView } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const { userId, setUserId } = useContext(UserType);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUsers();
  }, []);
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-posts");
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };
  console.log("posts", posts);
  useEffect(() => {
    fetchPosts();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;
      const updatedPosts = posts?.map((post) =>
        post?._id === updatedPost._id ? updatedPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log("error liking the post", error);
    }
  };
  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;
      // Update the posts array with the updated post
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      console.log("updated ",updatedPosts)
    
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={{
              uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
            }}
            style={{ width: 60, height: 40, resizeMode: "contain" }}
          />
        </View>
        <View style={{ marginTop: 20 }} />
        {posts?.map((item, index) => (
          <View
          key={index}
            style={{
              padding: 15,
              borderColor: "#d0d0d0",
              borderTopWidth: 1,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View>
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
            </View>
            <View>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
              >
                {item?.user?.name}
              </Text>
              <Text>{item?.content}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 15,
                }}
              >
                {item?.likes.includes(userId) ? (
                  <AntDesign
                    onPress={() => handleDislike(item?._id)}
                    name="heart"
                    size={18}
                    color="red"
                  />
                ) : (
                  <AntDesign
                    onPress={() => handleLike(item?._id)}
                    name="hearto"
                    size={18}
                  />
                )}

                <FontAwesome name="comment-o" size={18} />
                <Ionicons name="share-social-outline" size={18} />
              </View>
              <Text style={{ marginTop: 7, color: "gray" }}>
                {item?.likes?.length} likes {item?.replies?.length} reply
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
