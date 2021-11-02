import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import styled from "styled-components/native";
import { DARK_GREY_COLOR, YELLOW_COLOR } from "../styles/colors";
import { ellipsisWords, makeImgPath } from "../utils";
import Poster from "./Poster";

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
  font-size: 16px;
  font-weight: 800;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 10px;
`;
const Votes = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
const VotesRating = styled.Text`
  margin-left: 10px;
  margin-top: 5px;
  color: ${(props) => props.theme.textColor};
`;

const Slide: React.FC<ISlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const vote = Math.floor(Math.round(voteAverage) / 2);
  const isDark = useColorScheme() === "dark";
  return (
    <SlideView>
      <SlideBackgroundImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={90}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title>{originalTitle}</Title>
            <Overview>{ellipsisWords(overview, 55)}</Overview>
            {vote > 0 && (
              <Votes>
                <AirbnbRating
                  defaultRating={vote}
                  count={5}
                  size={20}
                  showRating={false}
                  isDisabled={true}
                  selectedColor={isDark ? YELLOW_COLOR : DARK_GREY_COLOR}
                />
                <VotesRating>{vote} / 5</VotesRating>
              </Votes>
            )}
          </Column>
        </Wrapper>
      </BlurView>
    </SlideView>
  );
};

interface ISlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  overview: string;
  voteAverage: number;
}

export default Slide;
