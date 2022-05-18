// Character Type
export interface Center {
  x: number;
  y: number;
}

export interface Color {
  [key: string]: string;
}

export type Scale = number;

export type Name = string;

export type Degree = number;

export type Expression = "normal" | "fun" | "sleep" | "wow";
