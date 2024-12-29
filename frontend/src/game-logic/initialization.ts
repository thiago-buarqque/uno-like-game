import {
  TCard,
  TCardColor,
  TCardItem,
  TCardItemValue,
} from "../components/card/Card";

const colors: TCardColor[] = ["blue", "yellow", "red", "green"];

const BASIC_CARDS: TCardItemValue[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const ACTION_CARDS: TCardItemValue[] = ["block", "reverse", "drawTwo"];
//const wildValues: TCardItem[] = ['wild', 'wildDrawFour'];

export function createDeck(): TCard[] {
  const deck: TCard[] = [];

  // For each color
  for (const color of colors) {
    // One zero card

    const cardItem: TCardItem = {
      type: "text",
      value: "0",
    };

    deck.push({
      id: crypto.randomUUID(),
      color,
      middleItem: cardItem,
      cornerItem: cardItem,
      type: "basic",
    });

    // Two copies of 1–9
    for (let i = 1; i < BASIC_CARDS.length; i++) {
      const cardItem: TCardItem = {
        type: "text",
        value: BASIC_CARDS[i],
      };

      deck.push({
        id: crypto.randomUUID(),
        color,
        middleItem: cardItem,
        cornerItem: cardItem,
        type: "basic",
      });
      deck.push({
        id: crypto.randomUUID(),
        color,
        middleItem: cardItem,
        cornerItem: cardItem,
        type: "basic",
      });
    }

    // Two copies of actions cards
    for (let i = 0; i < ACTION_CARDS.length; i++) {
      const value = ACTION_CARDS[i];

      const cardItem: TCardItem = {
        type: "image",
        value: value,
      };

      let cornerItem = cardItem;

      if (value === 'drawTwo') {
        cornerItem = {
          type: 'text',
          value: '+2'
        }
      }

      deck.push({
        id: crypto.randomUUID(),
        color,
        middleItem: cardItem,
        cornerItem: cornerItem,
        type: "basic",
      });
      deck.push({
        id: crypto.randomUUID(),
        color,
        middleItem: cardItem,
        cornerItem: cornerItem,
        type: "basic",
      });
    }
  }

  // Add 8 copies of the 'wild' card
  for (let i = 0; i < 8; i++) {
    const cardItem: TCardItem = {
      type: "image",
      value: "wild",
    };

    deck.push({
      id: crypto.randomUUID(),
      color: "black",
      middleItem: cardItem,
      cornerItem: cardItem,
      type: "action",
    });
  }

  // Add 4 copies of the 'wildFour' card
  for (let i = 0; i < 4; i++) {
    const cardItem: TCardItem = {
      type: "image",
      value: "wildFour",
    };

    deck.push({
      id: crypto.randomUUID(),
      color: "black",
      middleItem: cardItem,
      cornerItem: {
        type: "text",
        value: "+4",
      },
      type: "action",
    });
  }

  return shuffleDeck(deck);
}

function shuffleDeck(deck: TCard[]): TCard[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

//function dealCards(deck: Card[], players: Player[]): { deck: Card[], players: Player[] } {
//  const updatedPlayers = players.map(player => {
//    const hand = deck.slice(0, 7);
//    return { ...player, hand };
//  });
//
//  const remainingDeck = deck.slice(players.length * 7);
//  return { deck: remainingDeck, players: updatedPlayers };
//}
