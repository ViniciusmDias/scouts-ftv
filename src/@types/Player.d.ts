interface Attacks {
  sharkAttack: number;
  parallel: number;
  halfBottom: number;
  longDiagonal: number;
  shortDiagonal: number;
  halfDrop: number;
  dropBack: number;
  block: number;
  ace: number;
  forFree: number;
}

interface Errors {
  defense: number;
  attack: number;
  set: number;
  serve: number;
  netTouch: number;
}

interface Player {
  id?: string;
  name: string;
  attacks: Attacks;
  errors: Errors;
  updated_at?: Date;
  created_at?: Date;
}
