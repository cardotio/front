// import { motion, Variants } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { TypeCard, TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { currentCardsAtom } from 'atoms';
import { useRecoilState } from 'recoil';
import AddCard from './AddCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
  height: 300px;
  background: gray;
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

interface DeckProps {
  deck: TypeDeck;
}

function Deck({ deck }: DeckProps) {
  const [cards, setCards] = useRecoilState(currentCardsAtom);

  cards.map((card, i) => {
    if (card.deck?.deckId === deck.deckId) console.log(card);
  });

  return (
    <Wrapper>
      <Droppable droppableId={deck.deckname}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Title>{deck.deckname}</Title>
            <CardContainer>
              {cards.map((card, i) => {
                if (card.deck?.deckId === deck.deckId)
                  return <Card key={i} index={i} card={card} id={'id'} />;
              })}
            </CardContainer>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Deck);
