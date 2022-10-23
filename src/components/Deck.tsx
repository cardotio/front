// import { motion, Variants } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { TypeCard, TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
  height: 300px;
`;
const Title = styled.div`
  width: 180px;
  height: 36px;
  margin-bottom: 14px;
  border-radius: 12px;
  background: #dbe6ff;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-family: 'Gothic A1', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 36px;
  z-index: 300;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

// const vCards: Variants = {
//   initial: {},
//   animate: {},
//   hover: {},
// };
// const title: Variants = {
//   initial: {
//     y: 88,
//   },
//   animate: {},
//   hover: {
//     y: 0,
//     transition: {
//       type: 'spring',
//       velocity: 10,
//       stiffness: 50,
//     },
//   },
// };

interface DeckProps {
  title: string;
  data: TypeCard[];
  index: number;
}

function Deck(props: DeckProps) {
  return (
    <Wrapper
      // variants={vCards}
      // initial="initial"
      // animate="animate"
      // whileHover="hover"
    >
      <Droppable droppableId={props.title}>
        {provided => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Title>{props.title}</Title>
              <CardContainer>
                {props.data.slice(0, 5).map((card, i) => (
                  <Card key={i} index={i} card={card} id={props.title + "-" + i} />
                ))}
              </CardContainer>
              {provided.placeholder}
            </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Deck);
