import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { useColorScheme } from "react-native";
import {
  BLACK_COLOR,
  BRIGHT_GREY_COLOR,
  DARK_GREY_COLOR,
  LIGHT_GREY_COLOR,
  ORIGIN_BLACK_COLOR,
  YELLOW_COLOR,
} from "../styles/colors";
import { Feather } from "@expo/vector-icons";
import Movies from "../screens/Movies";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? ORIGIN_BLACK_COLOR : BRIGHT_GREY_COLOR,
      }}
      screenOptions={{
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY_COLOR : LIGHT_GREY_COLOR,
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: -5,
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        name="Moives"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="film" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <Feather name="tv" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <Feather name="search" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
