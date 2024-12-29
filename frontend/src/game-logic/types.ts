export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'wild';
export type Value = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | 'skip'
  | 'reverse'
  | 'drawTwo'
  | 'wild'
  | 'wildDrawFour';

export interface Card {
  id: string;     // unique identifier, e.g. uuid
  color: Color;
  value: Value;
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
}

export interface GameState {
  deck: Card[];
  discardPile: Card[];
  players: Player[];
  currentPlayerIndex: number;
  direction: 1 | -1; // 1 for clockwise, -1 for counterclockwise
  currentColor: Color; // color that must be matched (or 'wild' if last card is wild)
}
