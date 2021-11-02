import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  useColorScheme,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { BLACK_COLOR, BRIGHT_GREY_COLOR } from "../styles/colors";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery, useQueryClient } from "react-query";
import { MOVIES } from "../api";
import { IMovie, IMoviesResponse } from "../api.types";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const queryClient = useQueryClient();
  const isDark = useColorScheme() === "dark";

  const {
    data: nowMoviesData,
    isLoading: getNowMoviesLoading,
    isRefetching: isRefetchingGetNowMovies,
  } = useQuery<IMoviesResponse>(
    ["movies", "getNowMovies"],
    MOVIES.GET_NOW_MOVIES
  );
  const {
    data: trendingData,
    isLoading: getTrendingMoviesLoading,
    isRefetching: isRefetchingGetTrendingMovies,
  } = useQuery<IMoviesResponse>(
    ["movies", "getTrendingMovies"],
    MOVIES.GET_TRENDING
  );
  const {
    data: upcomingData,
    isLoading: getUpcomingMoviesLoading,
    isRefetching: isRefetchingGetUpcomingMovies,
  } = useQuery<IMoviesResponse>(
    ["movies", "getUpcomingMovies"],
    MOVIES.GET_UPCOMING
  );

  const onRefresh = () => {
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }: { item: IMovie }) => (
    <VMedia
      posterPath={item.poster_path}
      title={item.title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }: { item: IMovie }) => (
    <HMedia
      posterPath={item.poster_path}
      title={item.title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const keyExtractor = (item: IMovie) => item.id + "";

  const loading =
    getNowMoviesLoading || getTrendingMoviesLoading || getUpcomingMoviesLoading;
  const refreshing =
    isRefetchingGetNowMovies ||
    isRefetchingGetTrendingMovies ||
    isRefetchingGetUpcomingMovies;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
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

          <ListContainer>
            <ListTitle>✅ Trending Movies</ListTitle>
            <FlatList
              horizontal
              data={trendingData?.results}
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />
          </ListContainer>

          <ListTitle>💝 Coming soon</ListTitle>
        </>
      }
      data={upcomingData?.results}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
