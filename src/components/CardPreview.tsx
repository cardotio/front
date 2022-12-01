import React from 'react';
import styled from 'styled-components';
import { TypeCard } from 'types';
import { Draggable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import {
  deckListAtom,
  selectedCardAtom,
  selectedTeamAtom,
  userTokenAtom,
} from 'atoms';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { API_URL } from 'api';
import { useLocation, useSearchParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 200px;
  height: 130px;
  margin-bottom: 5px;
  padding: 8px 15px 8px 8px;
  background: #f7f7f7;
  border-radius: 8px;
  border: 1px lightgray solid;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  font-family: 'Noto Sans KR';
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 10px;
  transition: 0.1s all;
  cursor: pointer;

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
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardAtom);
  const [token, setToken] = useRecoilState(userTokenAtom);

  const cardClick = (e: any) => {
    setSelectedCard(card);
    setSearchParams({ card: card.cardId + '' });
  };

  const deleteCard = (e: any) => {
    e.stopPropagation();

    axios.delete(
      API_URL + `/teams/${selectedTeam?.teamId}/cards`,
      {
        headers: {
          Authorization: `${token}`,
        },
        data: {
          cardId: card.cardId
        }
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
