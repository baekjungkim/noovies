import React from "react";
import styled from "styled-components/native";
import { ellipsisWords } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
`;

const VMedia: React.FC<IVMediaProps> = ({
  posterPath,
  title,
  voteAverage,
  width = 190,
  hegith = 270,
}) => {
  return (
    <Movie>
      {posterPath && (
        <Poster
          path={posterPath}
          width={width}
          height={hegith}
          borderRadius={10}
        />
      )}
      <Title>{ellipsisWords(title, 16)}</Title>
      <Votes voteAverage={voteAverage} size={12} />
    </Movie>
  );
};

interface IVMediaProps {
  posterPath: string | null;
  title: string;
  voteAverage: number;
  width?: number;
  hegith?: number;
}

export default VMedia;
