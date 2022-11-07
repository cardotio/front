import { motion, Variants } from 'framer-motion';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { TypeCard } from 'types';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { detailCardModalOpenAtom, selectedCardAtom, selectedTeamAtom } from 'atoms';

const Wrapper = styled.div`
  width: 150px;
  height: 100px;
  padding: 10px;
  background: #f7f7f7;
  border-radius: 8px;
  border: 1px lightgray solid;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;
  font-family: 'Noto Sans KR';

  &:hover {
    background: #deb887;
    z-index: 200;
  }
`;

interface CardProps {
  index: number;
  card: TypeCard;
}

function Card({ index, card }: CardProps) {
  const navigate = useNavigate();
  const cardRef = useRef();
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardAtom);
  const [detailCardModalOpen, setDetailCardModalOpen] = useRecoilState(detailCardModalOpenAtom);
  const cardClick = (e:any) => {
    setSelectedCard(card); 
    setDetailCardModalOpen(true);
  };

  return (
    <Draggable 
      draggableId={'card' + card.cardId} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={cardClick}
        >
          {card.cardname}
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
