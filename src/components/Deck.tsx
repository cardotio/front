import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './CardPreview';
import AddCard from './AddCard';
import { useForm } from 'react-hook-form';

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
  index:number;
  deck: TypeDeck;
}

function Deck({ index, deck }: DeckProps) {
  const { register, handleSubmit, formState, resetField } = useForm();

  const onSubmit = ({ deckname }: any) => {
    // API request to modify deckname
  };

  return (
    <Draggable draggableId={'deck' + deck.deckId} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <DecknameForm onSubmit={handleSubmit(onSubmit)}>
            <DecknameInput {...register('deckname')} defaultValue={deck.deckname} />
          </DecknameForm>
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
      )}
    </Draggable>
  );
}

export default React.memo(Deck);
