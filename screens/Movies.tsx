import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";

import { ellipsisWords, makeImgPath } from "../utils";
import {
  BLACK_COLOR,
  BRIGHT_GREY_COLOR,
  DARK_GREY_COLOR,
  YELLOW_COLOR,
} from "../styles/colors";
import Slide from "../components/Slide";

const API_KEY = "36e03cb014020e57d1cae244d54455cd";

const ScrollView = styled.ScrollView``;

const SwierView = styled.View`
  flex: 1;
`;

const SwiperBackgroundImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

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

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
      )
    ).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
      )
    ).json();
    setUpcoming(results);
  };

  const getNowMovies = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
      )
    ).json();
    setMovies(results);
    setLoading(false);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowMovies()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading || movies.length === 0 ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        horizontal
        loop
        showsButtons={false}
        showsPagination={false}
        autoplay
        autoplayTimeout={3.5}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
        prevButton={
          <Feather
            name="chevron-left"
            size={24}
            color={isDark ? BRIGHT_GREY_COLOR : BLACK_COLOR}
          />
        }
        nextButton={
          <Feather
            name="chevron-right"
            size={24}
            color={isDark ? BRIGHT_GREY_COLOR : BLACK_COLOR}
          />
        }
      >
        {movies.length > 0 &&
          movies.map((movie) => {
            if (movie.backdrop_path) {
              return (
                <Slide
                  key={movie.id}
                  originalTitle={movie.title}
                  backdropPath={movie.backdrop_path}
                  posterPath={movie.poster_path}
                  overview={movie.overview}
                  voteAverage={movie.vote_average}
                />
              );
            }
          })}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
