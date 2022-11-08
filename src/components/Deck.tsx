import React from 'react';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './CardPreview';
import AddCard from './AddCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding: 10px;
  width: 170px;
  max-height: 100%;
  height: min-content;
  background: #c1c0b9;
  border-radius: 8px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.textColor};
  font-family: 'Gothic A1', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: left;
  margin-bottom: 5px;
`;

const DropArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 5px;
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
          <DropArea ref={provided.innerRef} {...provided.droppableProps}>
            <CardContainer>
              {deck.cards.map((card, i) => (
                <Card key={card.cardId} index={i} card={card} />
              ))}
              <AddCard deck={deck} />
            </CardContainer>
            {provided.placeholder}
          </DropArea>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Deck);
