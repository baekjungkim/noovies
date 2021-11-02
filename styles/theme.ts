import { DefaultTheme } from "styled-components";
import {
  BLACK_COLOR,
  BRIGHT_GREY_COLOR,
  DARK_GREY_COLOR,
  LIGHT_GREY_COLOR,
  ORIGIN_BLACK_COLOR,
  RED_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "./colors";

export const lightTheme: DefaultTheme = {
  backgroundColor: BRIGHT_GREY_COLOR,
  textColor: BLACK_COLOR,
  accentColor: YELLOW_COLOR,
  accentRedColor: RED_COLOR,
  notFoundImageColor: DARK_GREY_COLOR,
};

export const darkTheme: DefaultTheme = {
  backgroundColor: ORIGIN_BLACK_COLOR,
  textColor: WHITE_COLOR,
  accentColor: YELLOW_COLOR,
  accentRedColor: RED_COLOR,
  notFoundImageColor: LIGHT_GREY_COLOR,
};
