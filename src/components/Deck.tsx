import React from 'react';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import AddCard from './AddCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding: 10px;
  width: 170px;
  height: min-content;
  background: #c1c0b9;
  border-radius: 8px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.textColor};
  font-family: 'Gothic A1', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 5px;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  position: relative;
  width: 100%;
`;

interface DeckProps {
  deck: TypeDeck;
}

function Deck({ deck }: DeckProps) {
  return (
    <Wrapper>
      <Title>{deck.deckname}</Title>
      <Droppable droppableId={'' + deck.deckId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <CardContainer>
              <AddCard deck={deck} />
              {deck.cards.map((card, i) => (
                <Card key={card.cardId} index={i} card={card} />
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
