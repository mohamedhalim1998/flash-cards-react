export default interface Card {
  id?: number;
  cardsetId?: number;
  front: string;
  back: string;
  color?: string;
}

export const cardColors = [
  "#FFFFFF",
  "#FFF176",
  "#F9BE3D",
  "#C8F08F",
  "#A5F9EB",
  "#F08B82",
  "#CBF0F8",
  "#AFCBFA",
  "#D7AEFC",
  "#F5CEE9",
  "#E9EAEE",
];
