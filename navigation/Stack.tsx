import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import { YELLOW_COLOR } from "../styles/colors";
import { Feather } from "@expo/vector-icons";

const ScreenOne: React.FC<NativeStackScreenProps<any, "ScreenOne">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);
const ScreenTwo: React.FC<NativeStackScreenProps<any, "ScreenTwo">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree: React.FC<NativeStackScreenProps<any, "ScreenThree">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>go Search</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTintColor: YELLOW_COLOR,
        headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
};

export default Stack;
