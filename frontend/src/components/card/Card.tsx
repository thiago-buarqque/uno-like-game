import React from "react";
import './card.scss'

import BlockIcon from '../../assets/images/block.svg';
import DrawTwoIcon from '../../assets/images/drawTwo.svg';
import ReserveIcon from '../../assets/images/reverse.svg';
import WildIcon from '../../assets/images/wild.svg';
import WildFourIcon from '../../assets/images/wildFour.svg';

const ICONS: { [key: string]: string } = {
  'block': BlockIcon,
  'drawTwo': DrawTwoIcon,
  'reverse': ReserveIcon,
  'wild': WildIcon,
  'wildFour': WildFourIcon
}

export type TCardItem = {
  value: TCardItemValue;
  type: "image" | "text";
};

export type TCardColor = "black" | "blue" | "yellow" | "red" | "green";

export type TCardType = "basic" | "action";

export type TCardItemValue =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "block"
  | "reverse"
  | "drawTwo"
  | "wild"
  | "wildFour"
  | "+2"
  | "+4";

export type TCard = {
  id: string;
  color: TCardColor;
  type: TCardType;
  middleItem: TCardItem;
  cornerItem: TCardItem;
};

const Card: React.FC<{card: TCard}> = ({card}) => {
  const { color, cornerItem, middleItem, type } = card;

  const getCardItem = (item: TCardItem) => {
    return item.type === "text" ? (
      <span>{item.value}</span>
    ) : (
      <img src={ICONS[item.value]} />
    );
  };

  const getCornerItem = (position: "top-left" | "bottom-right") => {
    return <div className={`${position}-item`}>{getCardItem(cornerItem)}</div>;
  };

  return (
    <div className={`card ${color}`}>
      {getCornerItem("top-left")}

      <div className="middle-content">{getCardItem(middleItem)}</div>

      {getCornerItem("bottom-right")}

      <span className="card-value-bottom">{middleItem.value}</span>
    </div>
  );
};

export default Card;
