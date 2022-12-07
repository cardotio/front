import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../CardPreview';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCard from '../AddCard';
import { useForm } from 'react-hook-form';

import { IoIosMore, IoIosArrowDown } from 'react-icons/io';
import 'components/style.css';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { FcBusinessman } from 'react-icons/fc';
import { IoAdd, IoClose } from 'react-icons/io5';
import DeckDropDown from './DeckDropDown';
import OverlappedCard from 'components/card/OverlappedCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  padding: 5px;
  width: 210px;

  height: min-content;
  background: #f4f5f7;
  border-radius: 4px;
  transition: 0.3s all;

  box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.1em,
    rgb(90 125 188 / 5%) 0px 0.1em 1em;
`;
const DecknameForm = styled.form``;
const DecknameInput = styled.input`
  width: 100%;
  margin-top: 5px;
  padding: 6px;
  background-color: transparent;
  // color: ${(props) => props.theme.textColor};
  color: #5e6c84;
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

  overflow-y: auto;
  padding: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardContainer = styled.div`
  align-items: center;
  width: 100%;
`;

const DeckHeader = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 5px;
`;

interface DeckProps {
  deck: TypeDeck;
}

const Deck = ({ deck }: DeckProps) =>  {
  const { register, handleSubmit, formState, resetField } = useForm();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const lastCard = deck.cards[deck.cards.length - 1];
  const onSubmit = ({ deckname }: any) => {
    // API request to modify deckname
  };

  return (
    <Wrapper>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <DeckHeader>
        <DecknameForm onSubmit={handleSubmit(onSubmit)}>
          <DecknameInput
            {...register('deckname')}
            defaultValue={deck.deckname}
          />
        </DecknameForm>
        <IoIosArrowDown
          className="setting-icon"
          style={{
            transition: '0s',
            transform: isMinimized ? '' : 'rotate(180deg)',
          }}
          onClick={() => {
            // 덱에 카드가 하나도 없으면 안 접어짐
            if(deck.cards.length !== 0) setIsMinimized(!isMinimized)
          }}
        />
        <IoIosMore
          onClick={() => setShowDropDown(!showDropDown)}
          className="setting-icon"
        />
        <AnimatePresence>
          {showDropDown && (
            <DeckDropDown
              deck={deck}
              setShowDropDown={(showDropDown: boolean) =>
                setShowDropDown(showDropDown)
              }
            />
          )}
        </AnimatePresence>
      </DeckHeader>
      {isMinimized ? (
        <OverlappedCard lastCard={lastCard} />
      ) : (
        <>
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
          <AddCard deck={deck} />
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Deck);
