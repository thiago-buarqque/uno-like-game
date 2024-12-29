import { Card, Color, GameState } from "./types";

function canPlayCard(card: Card, topCard: Card, currentColor: Color): boolean {
  return card.color === currentColor || card.value === topCard.value || card.color === 'wild';
}

export function playCard(state: GameState, cardId: string): GameState {
  const player = state.players[state.currentPlayerIndex];
  const cardIndex = player.hand.findIndex(c => c.id === cardId);
  if (cardIndex === -1) return state; // No such card in player's hand

  const cardToPlay = player.hand[cardIndex];
  const topCard = state.discardPile[state.discardPile.length - 1];

  if (!canPlayCard(cardToPlay, topCard, state.currentColor)) {
    return state; // Can't play this card
  }

  // Play the card
  const updatedPlayer = {
    ...player,
    hand: [...player.hand.slice(0, cardIndex), ...player.hand.slice(cardIndex + 1)]
  };

  const updatedDiscard = [...state.discardPile, cardToPlay];
  const updatedColor = cardToPlay.color === 'wild' ? state.currentColor : cardToPlay.color;

  // Handle action cards
  let nextState = applyCardEffects({ 
    ...state,
    discardPile: updatedDiscard,
    players: state.players.map((p, i) => i === state.currentPlayerIndex ? updatedPlayer : p),
    currentColor: updatedColor
  }, cardToPlay);

  // Check for UNO (if player has one card left, they must say “UNO”)
  // Check if player won (no cards left)
  // Advance to next player
  nextState = advanceToNextPlayer(nextState);
  
  return nextState;
}

function applyCardEffects(state: GameState, card: Card): GameState {
  switch(card.value) {
    case 'skip':
      return advanceToNextPlayer(state);
    case 'reverse':
      return { ...state, direction: state.direction === 1 ? -1 : 1 };
    case 'drawTwo':
      return drawCardsForNextPlayer(state, 2);
    case 'wildDrawFour':
      return drawCardsForNextPlayer(state, 4);
    default:
      return state;
  }
}

function advanceToNextPlayer(state: GameState): GameState {
  const playerCount = state.players.length;
  const newIndex = (state.currentPlayerIndex + state.direction + playerCount) % playerCount;
  return { ...state, currentPlayerIndex: newIndex };
}

function drawCardsForNextPlayer(state: GameState, count: number): GameState {
  const playerCount = state.players.length;
  const nextPlayerIndex = (state.currentPlayerIndex + state.direction + playerCount) % playerCount;
  const drawnCards = state.deck.slice(0, count);
  const remainingDeck = state.deck.slice(count);

  const updatedPlayers = state.players.map((player, i) => {
    if (i === nextPlayerIndex) {
      return { ...player, hand: [...player.hand, ...drawnCards] };
    }
    return player;
  });

  // After drawing, usually turn continues to the next player
  return {
    ...state,
    players: updatedPlayers,
    deck: remainingDeck
  };
}
