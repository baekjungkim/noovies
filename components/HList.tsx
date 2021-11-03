import React from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { IMovieProps, ITvProps } from "../api.types";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const HListSeparator = styled.View`
  width: 20px;
`;

type RenderProps = IMovieProps & ITvProps;

const keyExtractor = (item: RenderProps) => item.id + "";

const renderItem = ({ item }: { item: RenderProps }) => {
  return (
    <VMedia
      posterPath={item.poster_path}
      title={item.title ? item.title : item.name}
      voteAverage={item.vote_average}
    />
  );
};

const HList: React.FC<IHListPorps> = ({ title, data }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        data={data}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={HListSeparator}
        renderItem={renderItem}
      />
    </ListContainer>
  );
};

interface IHListPorps {
  title: string;
  data: IMovieProps[] | ITvProps[];
}

export default HList;
