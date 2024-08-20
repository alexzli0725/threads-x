import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Thread from "./Thread";
import Activity from "./Activity";
import Profile from "./Profile";

const main = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} />
            ) : (
              <AntDesign name="home" size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Thread"
        component={Thread}
        options={{
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="create" size={24} />
            ) : (
              <Ionicons name="create-outline" size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="heart" size={24} />
            ) : (
              <AntDesign name="hearto" size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} />
            ) : (
              <Ionicons name="person-outline" size={24} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default main;
