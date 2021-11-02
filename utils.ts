export const makeImgPath = (img: string, width: string = "w500"): string => {
  return `https://image.tmdb.org/t/p/${width}${img}`;
};

export const ellipsisWords = (str: string, length: number = 13): string => {
  return str.length > length ? str.slice(0, length) + "..." : str;
};

export const convertDate = (date: string): string => {
  return new Date(date).toLocaleDateString("ko", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
