import React from 'react';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import AddCard from './AddCard';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  width: 170px;
  height: 300px;
  background: #9b9b9b17;
  border-radius: 12px;
`;
const Title = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 12px;
  background: #dbe6ff;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-family: 'Gothic A1', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 36px;
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
  return (
    <Wrapper>
      <Title>{deck.deckname}</Title>
      <Droppable droppableId={'' + deck.deckId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ width: '100%', height: '100%' }}
          >
            <CardContainer>
              <AddCard deck={deck} index={deck.cards.length} />
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
