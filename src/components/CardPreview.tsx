import { motion, Variants } from 'framer-motion';
import React, { SyntheticEvent, useRef } from 'react';
import styled from 'styled-components';
import { TypeCard } from 'types';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  deckListAtom,
  detailCardModalOpenAtom,
  selectedCardAtom,
  selectedTeamAtom,
  userTokenAtom,
} from 'atoms';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { API_URL } from 'api';

const Wrapper = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
  padding: 8px 15px 8px 8px;
  background: #f7f7f7;
  border-radius: 8px;
  border: 1px lightgray solid;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  font-family: 'Noto Sans KR';

  &:hover {
    background: #d7d7d7;
    z-index: 200;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  border-radius: 10px;
  transition: 0.1s all;

  svg {
    fill: #a5a5a5;
    transition: 0.1s all;
  }

  &:hover {
    background: #8f8f8fb3;
    svg {
      fill: #fff;
    }
  }
`;

interface CardProps {
  index: number;
  card: TypeCard;
}

function CardPreview({ index, card }: CardProps) {
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardAtom);
  const [detailCardModalOpen, setDetailCardModalOpen] = useRecoilState(
    detailCardModalOpenAtom,
  );
  const [token, setToken] = useRecoilState(userTokenAtom);

  const cardClick = (e: any) => {
    setSelectedCard(card);
    setDetailCardModalOpen(true);
  };

  const deleteCard = (e: any) => {
    e.stopPropagation();

    axios.delete(
      API_URL + `/teams/${selectedTeam?.teamId}/cards/${card.cardId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    setDecks((prev) => {
      let decksCopy = [...prev];
      const dIndex = decksCopy.findIndex((d) => d.deckId === card.deck?.deckId);

      decksCopy.splice(dIndex, 1, {
        ...decksCopy[dIndex],
        cards: decksCopy[dIndex].cards.filter((c) => c.cardId !== card.cardId),
      });

      return decksCopy;
    });
  };

  return (
    <Draggable draggableId={'card' + card.cardId} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={cardClick}
        >
          <IconContainer onClick={deleteCard}>
            <IoClose />
          </IconContainer>
          {card.cardname}
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(CardPreview);
