import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image<{
  width: number;
  height: number;
  borderRadius: number;
}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => `${props.borderRadius}px`};
  background-color: ${(props) => props.theme.notFoundImageColor};
`;

const Poster: React.FC<IPosterProps> = ({
  path,
  width = 100,
  height = 160,
  borderRadius = 5,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Image
      source={{
        uri: makeImgPath(path),
      }}
      width={width}
      height={height}
      borderRadius={borderRadius}
    />
  );
};

interface IPosterProps {
  path: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export default Poster;
