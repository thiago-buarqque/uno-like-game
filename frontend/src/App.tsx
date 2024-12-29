import React from 'react';
import { createDeck } from './game-logic/initialization';
import Card from './components/card/Card';
import Player from './components/player/player';

const deck = createDeck()

const App: React.FC = () => {

  return (
    <div className="app">
      <Player cardAmount={5} name='Evry' profilePicture='' />
    </div>
  );
};

        //{
        //  deck.map((card, i) => (
        //    <Card key={i} card={card} />
        //  ))
        //}
export default App;
