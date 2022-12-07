import React from 'react';
import styled from 'styled-components';
import { FcBusinessman } from 'react-icons/fc';
import { TypeCard } from 'types';
import { Draggable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import moment from "moment";
import 'moment/locale/ko';
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
  width: 190px;
  height: 120px;
  margin-bottom: 6px;
  padding: 4px 8px;
  line-height: 25px;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: rgb(67 71 85 / 27%) 0px 0px 0.1em, rgb(90 125 188 / 5%) 0px 0.1em 1em;
  cursor: pointer;
  
  font-family: "Noto Sans KR",sans-serif !important;

  position: relative;
  

  &:hover {
    background: #e8e8e8b3;
  }
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

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
  height: 100%;
`;

const Cardname = styled.div``;
const Creator = styled.div`
  display: flex;
`;
const CreatorImage = styled.div`
  display: flex;
  svg {
    width: 20px;
    height: 20px;
  }
`
const Creatorname = styled.div`
  color: #5e6c84;
  font-size: 12px;
  line-height: 19px;
`;

const CreatedDate = styled.div`
  color: #5e6c84;
  font-size: 12px;
  line-height: 19px;
`

const Sub = styled.div`
  display: flex;
  justify-content: space-between;
`
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

    axios.delete(API_URL + `/teams/${selectedTeam?.teamId}/cards`, {
      headers: {
        Authorization: `${token}`,
      },
      data: {
        cardId: card.cardId,
      },
    });

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
          <Preview>
            <Cardname>{card.cardname}</Cardname>
            <Sub>
              <Creator>
              <CreatorImage>
                <FcBusinessman />
              </CreatorImage>
              <Creatorname>{card.creator?.displayname}</Creatorname>
              </Creator>
              
              <CreatedDate>{moment(card.createdDate).fromNow()}</CreatedDate>
            </Sub>
          </Preview>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(CardPreview);
