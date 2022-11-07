import { motion, Variants } from 'framer-motion';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { TypeCard } from 'types';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { detailCardModalOpenAtom, selectedCardAtom, selectedTeamAtom } from 'atoms';

const Wrapper = styled(motion.div)<{ index: number }>`
  /* position: absolute;
  left: 10px;
  top: ${(props) => 20 + 36 * props.index + 'px'}; */
  width: 150px;
  height: 100px;
  padding: 10px;
  background: #f7f7f7;
  border-radius: 8px;
  border: 1px lightgray solid;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  /* border-radius: 10px; */
  /* transform: rotate(45deg); */
  /* transition: 0.5s all; */
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
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={(e) => cardClick(e)}
        >
          <Wrapper index={index}>
            {card.cardname}
          </Wrapper>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
