import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { ellipsisWords, makeImgPath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const SlideView = styled.View`
  flex: 1;
`;

const SlideBackgroundImg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 50%;
  margin-left: 20px;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
  font-size: 19px;
  font-weight: 800;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
`;

const Slide: React.FC<ISlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <SlideView>
      {backdropPath && (
        <SlideBackgroundImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
      )}
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={90}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          {posterPath && <Poster path={posterPath} />}
          <Column>
            <Title>{originalTitle}</Title>
            <Votes voteAverage={voteAverage} />
            <Overview>{ellipsisWords(overview, 55)}</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </SlideView>
  );
};

interface ISlideProps {
  backdropPath: string | null;
  posterPath: string | null;
  originalTitle: string;
  overview: string;
  voteAverage: number;
}

export default Slide;
