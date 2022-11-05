// import { motion, Variants } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { currentCardsAtom } from 'atoms';
import { useRecoilState } from 'recoil';
import AddCard from './AddCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  width: 170px;
  height: 300px;
  background: #C1C0B9;
  border-radius: 8px;
`;
const Title = styled.div`
  height: 36px;
  margin-left: 20px;
  color: ${(props) => props.theme.textColor};
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
  let cardIndex = 0;

  return (
    <Wrapper>
      <Droppable droppableId={deck.deckname}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ width: '100%' }}
          >
            <Title>{deck.deckname}</Title>
            <CardContainer>
              {cards.map((card, i) => {
                if (card.deck?.deckId === deck.deckId)
                  return <Card key={i} index={cardIndex++} card={card} />;
              })}
              <AddCard deck={deck} index={cardIndex++} />
            </CardContainer>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Deck);
