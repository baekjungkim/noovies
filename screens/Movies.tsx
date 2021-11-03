import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  BLACK_COLOR,
  BRIGHT_GREY_COLOR,
  DARK_GREY_COLOR,
} from "../styles/colors";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { MOVIES_API } from "../api";
import { IMovieProps, IMoviesResponse } from "../api.types";
import Loader from "../components/Loader";
import HList from "../components/HList";

const FlatListContainer = styled.FlatList`
  margin-bottom: 30px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const HSeparator = styled.View<{ isDark: boolean }>`
  height: 1px;
  background-color: ${(props) =>
    props.isDark ? BRIGHT_GREY_COLOR : DARK_GREY_COLOR};
  margin: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();
  const isDark = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);

  const { data: nowMoviesData, isLoading: getNowMoviesLoading } =
    useQuery<IMoviesResponse>(
      ["movies", "getNowMovies"],
      MOVIES_API.GET_NOW_MOVIES
    );
  const { data: trendingData, isLoading: getTrendingMoviesLoading } =
    useQuery<IMoviesResponse>(
      ["movies", "getTrendingMovies"],
      MOVIES_API.GET_TRENDING
    );
  const { data: upcomingData, isLoading: getUpcomingMoviesLoading } =
    useQuery<IMoviesResponse>(
      ["movies", "getUpcomingMovies"],
      MOVIES_API.GET_UPCOMING
    );

  const renderHMedia = ({ item }: { item: IMovieProps }) => (
    <HMedia
      posterPath={item.poster_path}
      title={item.title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const keyExtractor = (item: IMovieProps) => item.id + "";

  const loading =
    getNowMoviesLoading || getTrendingMoviesLoading || getUpcomingMoviesLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  return loading ? (
    <Loader />
  ) : (
    <FlatListContainer<React.ElementType>
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            showsButtons={false}
            showsPagination={false}
            autoplay
            autoplayTimeout={3.5}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
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
            {nowMoviesData?.results.map((movie) => {
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

          {trendingData ? (
            <HList title="✅ Trending Movies" data={trendingData?.results} />
          ) : null}

          <ListTitle>💝 Coming soon</ListTitle>
        </>
      }
      data={upcomingData?.results}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <HSeparator isDark={isDark} />}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
