import React from "react";

import "./player.scss";

interface props {
  cardAmount: number;
  name: string;
  profilePicture: string;
}

const Player: React.FC<props> = ({ cardAmount, name }) => {
  return (
    <div className="player">
      <div className="cards">
        {Array.from({ length: cardAmount }, (_, index) => {
          const angle = (index - (cardAmount - 1) / 2) * 15; // Spread cards evenly
          const translateY =
            -Math.abs((index - (cardAmount - 1) / 2) * 15) + 100;

          return (
            <div
              key={index}
              className="opponent-card"
              style={{
                transform: `translateY(-${translateY}px) translateX(-${index * 50}%)`,
              }}
            ></div>
          );
        })}
      </div>
      <div className="profile-picture"></div>
      <span className="name">{name}</span>
    </div>
  );
};

export default Player;
