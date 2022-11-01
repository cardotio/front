import { motion, Variants } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { TypeCard } from 'types';
import { Draggable } from 'react-beautiful-dnd';
import { isPropertySignature } from 'typescript';

const Wrapper = styled(motion.div)<{ index: number }>`
  position: absolute;
  left: 10px;
  top: ${(props) => props.index * 30 + 10 + 'px'};
  width: 150px;
  height: 90px;
  margin-bottom: 14px;
  padding: 10px;
  background: #f7f6e7;
  border: 1px lightgray solid;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  /* border-radius: 10px; */
  /* transform: rotate(45deg); */
  transition: 0.2s background, 0.4s z-index;
  cursor: pointer;
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
    // console.log(card);
  };

  return (
    <Draggable draggableId={index + ''} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Wrapper onClick={cardClick} index={index}>
            {card.cardname}
          </Wrapper>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
