export const makeImgPath = (img: string, width: string = "w500"): string => {
  return `https://image.tmdb.org/t/p/${width}${img}`;
};

export const ellipsisWords = (str: string, length: number = 13): string => {
  let words = str;
  if (words.length > length) {
    words = words.substr(0, length - 2) + "...";
  }

  return words;
};
