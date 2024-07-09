export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Socket = {};

export type Node = {
  id: number;
  icon: string;
  title: string;
  inputSocket?: Socket;
  outputSocket?: Socket;
  initialPosition: Position;
};

export type Path = {
  from: number;
  to: number;
};
