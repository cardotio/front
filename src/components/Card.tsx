import React from 'react';
import styled from 'styled-components';
import { TypeCard } from 'types';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  width: 150px;
  padding: 5px;
  background: #f7f6e7;
  border: 1px lightgray solid;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  font-family: 'Noto Sans KR';

  &:hover {
    background: #deb887;
    z-index: 200;
  }
`;

interface CardProps {
  index: number;
  card: TypeCard;
}

function Card({ index, card }: CardProps) {
  const cardClick = () => {
    console.log(card);
  };

  return (
    <Draggable draggableId={'' + card.cardId} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={cardClick}
        >
          {card.cardname}
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
