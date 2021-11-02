import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Poster: React.FC<IPosterProps> = ({ path }) => (
  <Image
    source={{
      uri: makeImgPath(path),
    }}
  />
);

interface IPosterProps {
  path: string;
}

export default Poster;
