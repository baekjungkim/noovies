import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { TV_API } from "../api";
import { ITvResponse } from "../api.types";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv: React.FC<NativeStackScreenProps<any, "Tv">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<ITvResponse>(["tv", "getTrending"], TV_API.GET_TRENDING);
  const { isLoading: popularLoading, data: popularData } =
    useQuery<ITvResponse>(["tv", "getPopular"], TV_API.GET_POPULAR);
  const { isLoading: topRatedLoading, data: topRatedData } =
    useQuery<ITvResponse>(["tv", "getTopRated"], TV_API.GET_TOP_RATED);

  const loading = popularLoading || topRatedLoading || trendingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      {trendingData ? (
        <HList title="✅ Trending TV" data={trendingData?.results} />
      ) : null}
      {popularData ? (
        <HList title="❤️‍🔥 Popular TV" data={popularData?.results} />
      ) : null}
      {topRatedData ? (
        <HList title="🏅 TOP Rated" data={topRatedData?.results} />
      ) : null}
    </ScrollView>
  );
};

export default Tv;
