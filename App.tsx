import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Image, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styles/theme";

const queryClient = new QueryClient();

const loadFonts = (fonts: any) =>
  fonts.map((font: string) => Font.loadAsync(font));

const loadImages = (images: any[]) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Feather.font, AntDesign.font]);
    const images = loadImages([
      require("./assets/do-ma.jpeg"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);
    await Promise.all([...fonts, ...images]);
  };

  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          {/* <Stack /> */}
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
