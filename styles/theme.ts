import { DefaultTheme } from "styled-components";
import {
  BLACK_COLOR,
  BRIGHT_GREY_COLOR,
  ORIGIN_BLACK_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "./colors";

export const lightTheme: DefaultTheme = {
  backgroundColor: BRIGHT_GREY_COLOR,
  textColor: BLACK_COLOR,
  accentColor: YELLOW_COLOR,
};

export const darkTheme: DefaultTheme = {
  backgroundColor: ORIGIN_BLACK_COLOR,
  textColor: WHITE_COLOR,
  accentColor: YELLOW_COLOR,
};
