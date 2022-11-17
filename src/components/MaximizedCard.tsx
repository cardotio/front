import { selectedCardAtom } from 'atoms';
import React from 'react';
import { FcBusinessman } from 'react-icons/fc';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeCard } from 'types';

const Wrapper = styled.div<{ selectedCard: any }>`
  display: ${({ selectedCard }) => (selectedCard ? 'block' : 'none')};
  width: 90%;
  height: 90vh;
  background-color: #f7f7f7;
  position: absolute;
`;

interface MaximizedCardProps {}
function MaximizedCard({}: MaximizedCardProps) {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardAtom);
  return <Wrapper selectedCard={selectedCard}></Wrapper>;
}

export default React.memo(MaximizedCard);
