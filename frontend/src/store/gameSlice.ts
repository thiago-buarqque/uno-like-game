// src/store/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Card } from '../game-logic/types';
import { createDeck } from '../game-logic/initialization';
import { playCard as playCardLogic } from '../game-logic/utils';

// Helper function to create initial game state
function initialGameState(): GameState {
  const deck = createDeck();
  // For this example, just 2 players
  const players = [
    { id: 'p1', name: 'Player 1', hand: [] },
    { id: 'p2', name: 'Player 2', hand: [] }
  ];

  // Deal cards
  const dealt = dealCards(deck, players);
  const topCard = dealt.deck.shift()!;
  return {
    deck: dealt.deck,
    discardPile: [topCard],
    players: dealt.players,
    currentPlayerIndex: 0,
    direction: 1,
    currentColor: topCard.color
  };
}

function dealCards(deck: Card[], players: {id: string; name: string; hand: Card[]}[]) {
  const updatedPlayers = players.map(player => {
    const hand = deck.slice(0, 7);
    return { ...player, hand };
  });

  const remainingDeck = deck.slice(players.length * 7);
  return { deck: remainingDeck, players: updatedPlayers };
}

const initialState = initialGameState();

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    playCard: (state, action: PayloadAction<string>) => {
      // cardId is passed from the payload
      const newState = playCardLogic(state, action.payload);
      Object.assign(state, newState); // mutate state based on returned newState
    },
    drawCard: (state) => {
      // Implement draw logic if player cannot play a card
      // This logic would be similar to what is outlined in `playCardLogic`
      if (state.deck.length > 0) {
        const currentPlayer = state.players[state.currentPlayerIndex];
        const card = state.deck.shift()!;
        currentPlayer.hand.push(card);
      }
    }
  }
});

export const { playCard, drawCard } = gameSlice.actions;
export default gameSlice.reducer;
