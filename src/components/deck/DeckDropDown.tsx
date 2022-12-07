import React, { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { BiHide } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import { TypeDeck } from 'types';
import { useRecoilState } from 'recoil';
import { deckListAtom, deleteDeckModalOpenAtom, selectedDeckAtom, userTokenAtom } from 'atoms';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;
const CloseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  width: 15px;
  cursor: pointer;
  &:hover {
    background: #eeeeee;
  }
`;
const DropDown = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 5px;
  top: 40px;
  min-width: 150px;

  border-radius: 4px;
  background: white;
  max-width: calc(100vw - 24px);
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  overflow: hidden;
  z-index: 10;
`;

const HideButton = styled.button`
  all: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  width: 130px;
  height: 25px;
  padding: 5px;
  margin: 4px auto;
  border-radius: 4px;
  transition: 0.2s all;
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover {
    background: #b1b1b147;
  }
`;
const DeleteButton = styled.button`
  all: unset;
  display: flex;
  justify-content: space-between;
  color: #ff5555;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  width: 130px;

  height: 30px;
  padding: 5px;
  margin: 0px auto 4px;
  border-radius: 4px;
  transition: 0.2s all;
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover {
    background: #b1b1b147;
  }
`;

interface DeckDropDownProps {
  setShowDropDown: Function;
  deck: TypeDeck;
}
function DeckDropDown({ setShowDropDown, deck }: DeckDropDownProps) {
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const [token, setToken] = useRecoilState(userTokenAtom);
  const teamId = location.pathname.split('/')[2];
  const [deleteDeckModalOpen, setDeleteDeckModalOpen] =
    useRecoilState(deleteDeckModalOpenAtom);
    const [selectedDeck, setSelectedDeck] = useRecoilState(selectedDeckAtom);


  const deleteDeck = () => {        
    // 삭제된 덱 decks에서 없애기
    setDecks(decks.filter(d => d.deckId !== deck.deckId));
    setShowDropDown(false);
    axios
      .delete(
        API_URL + `/teams/${teamId}/decks`, {
          headers: { Authorization: `${token}` },
          data: { deckId: deck.deckId }
        }
      )
      .then((response: AxiosResponse) => {
        // 여기서 삭제된 덱 decks에서 없앴는데 응답 오고 지우니까 느림
        // setDecks(decks.filter(d => d.deckId !== deck.deckId));
        // setShowDropDown(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
  }
  return (
    <DropDown
      transition={{
        type: "spring",
        duration: 0.3
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {/* 이거 모달처럼 딴데 클릭하면 없어지게 못 하나
      <CloseContainer onClick={() => setShowDropDown(false)}>
        <IoClose />
      </CloseContainer> */}
      <Wrapper>
      <HideButton >
        <BiHide />
        숨기기
      </HideButton>
      <DeleteButton onClick={() => {
        setDeleteDeckModalOpen(true);
        setShowDropDown(false);
        setSelectedDeck(deck);
      }}>
        <AiOutlineDelete />
        삭제하기
      </DeleteButton>
      </Wrapper>
      
    </DropDown>
  );
}

export default React.memo(DeckDropDown);
