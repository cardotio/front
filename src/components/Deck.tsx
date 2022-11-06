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
