interface Attacks {
  sharkAttack: number;
  sharkAttackAttempts: number;
  parallel: number;
  parallelAttempts: number;
  halfBottom: number;
  halfBottomAttempts: number;
  longDiagonal: number;
  longDiagonalAttempts: number;
  shortDiagonal: number;
  shortDiagonalAttempts: number;
  halfDrop: number;
  halfDropAttempts: number;
  dropBack: number;
  dropBackAttempts: number;
  block: number;
  blockAttempts: number;
  forFree: number;
  forFreeAttempts: number;
  ace: number;
}

interface Errors {
  defense: number;
  attack: number;
  set: number;
  serve: number;
  netTouch: number;
  receive: number;
}

interface Player {
  id?: string;
  name: string;
  attacks: Attacks;
  errors: Errors;
  updated_at?: Date;
  created_at?: Date;
}
