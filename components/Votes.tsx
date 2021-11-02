import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { DARK_GREY_COLOR, RED_COLOR, YELLOW_COLOR } from "../styles/colors";

const VotesView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const VotesRating = styled.Text<{ size: number }>`
  color: ${(props) => props.theme.textColor};
  font-size: ${(props) => (props.size ? `${props.size}px` : "14px")};
  margin-left: 5px;
  font-weight: 600;
`;

const Votes: React.FC<IVotesProps> = ({ voteAverage, size = 14 }) => {
  const isDark = useColorScheme() === "dark";

  return (
    <VotesView>
      <AntDesign
        name="star"
        size={size}
        color={isDark ? YELLOW_COLOR : RED_COLOR}
      />
      <VotesRating size={size}>
        {voteAverage > 0 ? `${voteAverage} / 10` : "Coming soon"}{" "}
      </VotesRating>
    </VotesView>
  );
};

interface IVotesProps {
  voteAverage: number;
  size?: number;
}

export default Votes;
