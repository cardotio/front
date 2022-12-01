import React from 'react';
import styled from 'styled-components';
import { VscAdd } from 'react-icons/vsc';
import { TypeDeck } from 'types';
import { useRecoilState } from 'recoil';
import { addCardDeckAtom, addCardModalOpenAtom } from 'atoms';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  //
  //background: #ffffff91;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
  border-radius: 10px;
  transition: 0.2s all;
  cursor: pointer;
  svg {
    fill: #999;
    transition: 0.2s all;
  }
  &:hover {
    background: #00000047;
    svg {
      fill: #fff;
    }
  }
`;

interface Props {
  deck: TypeDeck;
}

function AddCard({ deck }: Props) {
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [addCardDeck, setAddCardDeck] = useRecoilState(addCardDeckAtom);

  const handleAddCard = () => {
    setAddCardModalOpen(true);
    setAddCardDeck(deck);
  };

  return (
    <Wrapper onClick={handleAddCard}>
      <VscAdd />
    </Wrapper>
  );
}

export default React.memo(AddCard);
