import React from 'react';
import styled from 'styled-components';
import { VscAdd } from 'react-icons/vsc';
import { TypeDeck } from 'types';
import { useRecoilState } from 'recoil';
import { addCardDeckAtom, addCardModalOpenAtom } from 'atoms';
import { IoAdd } from 'react-icons/io5';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  width: 95%;
  height: 30px;
  padding: 5px;
  margin: 4px auto;
    //
  //background: #ffffff91;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
  border-radius: 4px;
  transition: 0.2s all;
  cursor: pointer;
  svg {
    fill: #999;
    transition: 0.2s all;
  }
  &:hover {
    background: #b1b1b147;
  }
`;
const Description = styled.div`
  color: #5e6c84;
  font-size: 14px;
`
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
      <Description>Add a card</Description>
      <IoAdd />
    </Wrapper>
  );
}

export default React.memo(AddCard);
