import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './CardPreview';
import AddCard from './AddCard';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding: 10px;
  width: 220px;
  max-height: 100%;
  height: min-content;
  background: #c1c0b9;
  border-radius: 8px;
  transition: 0.3s all;
`;
const DecknameForm = styled.form``;
const DecknameInput = styled.input`
  width: 100%;
  margin-bottom: 4px;
  padding: 6px;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  font-family: 'Gothic A1', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: left;
  border: none;
  outline: none;
  overflow: hidden;
  overflow-wrap: break-word;
  cursor: pointer;

  &:focus {
    background: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
    cursor: text;
  }
`;

const DropArea = styled.div`
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardContainer = styled.div`
  align-items: center;
  width: 100%;
`;

const DeckHeader = styled.div`
  display: flex;
  margin-bottom: 5px;
`
interface DeckProps {
  deck: TypeDeck;
}

function Deck({ deck }: DeckProps) {
  const { register, handleSubmit, formState, resetField } = useForm();

  const onSubmit = ({ deckname }: any) => {
    // API request to modify deckname
  };

  return (
    <Wrapper>
      <DeckHeader>
        <DecknameForm onSubmit={handleSubmit(onSubmit)}>
          <DecknameInput {...register('deckname')} defaultValue={deck.deckname} />
        </DecknameForm>
        <AddCard deck={deck} />
      </DeckHeader>
      
      <Droppable droppableId={'' + deck.deckId}>
        {(provided, snapshot) => (
          <DropArea ref={provided.innerRef} {...provided.droppableProps}>
            <CardContainer>
              {deck.cards.map((card, i) => (
                <Card key={card.cardId} index={i} card={card} />
              ))}

            </CardContainer>
            {provided.placeholder}
          </DropArea>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Deck);
