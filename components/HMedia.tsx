import React from "react";
import styled from "styled-components/native";
import { convertDate, ellipsisWords } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 10px;
  width: 85%;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 5px;
  width: 80%;
`;

const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin-vertical: 10px;
`;

const HMedia: React.FC<IHMediaProps> = ({
  posterPath,
  title,
  releaseDate,
  overview,
  voteAverage,
}) => {
  return (
    <Movie>
      {posterPath && <Poster path={posterPath} />}
      <HColumn>
        <Title>{ellipsisWords(title, 20)}</Title>
        {releaseDate && <Release>개봉일: {convertDate(releaseDate)}</Release>}
        {voteAverage && <Votes voteAverage={voteAverage} size={12} />}
        <Overview>{ellipsisWords(overview, 100)}</Overview>
      </HColumn>
    </Movie>
  );
};

interface IHMediaProps {
  posterPath: string | null;
  title: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

export default HMedia;
