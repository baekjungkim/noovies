import React from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { DARK_GREY_COLOR, LIGHT_GREY_COLOR } from "../styles/colors";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Loader = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Container>
      <ActivityIndicator color={isDark ? LIGHT_GREY_COLOR : DARK_GREY_COLOR} />
    </Container>
  );
};

export default Loader;
