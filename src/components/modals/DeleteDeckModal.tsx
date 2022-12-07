import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'styled-react-modal';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  addDeckModalOpenAtom,
  deckListAtom,
  deleteDeckModalOpenAtom,
  selectedDeckAtom,
  userInfoAtom,
  userTokenAtom,
} from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';

const Container = styled.div`
  width: 450px;
  display: flex;
  padding: 20px 20px 20px 28px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
  flex-direction: column;
  gap: 20px;
`;
const Header = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  margin-left: 3px;
`;

const Deckname = styled.div`
  margin: 10px;
  font-size: 1.3rem;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  margin-left: 3px;
`;
const Body = styled.div`
    line-height: 30px;
    padding-right: 5px;
`;
const DeleteButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  background: #ff5555;
  color: #fff;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100px;

  height: 30px;
  padding: 5px;
  text-align: center;
  border-radius: 4px;
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    background: #ff7878;
  }
`;
const CancelButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  color: #5e6c84;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100px;
  text-align: center;
  height: 30px;
  padding: 5px;
  background: #b1b1b147;
  border-radius: 4px;
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    background: #b1b1b124;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 5px;
`;
interface IModal {
  isOpen: boolean;
}

function DeleteDeckModal({ isOpen }: IModal) {
  const [deleteDeckModalOpen, setDeleteDeckModalOpen] = useRecoilState(
    deleteDeckModalOpenAtom,
  );
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const [selectedDeck, setSelectedDeck] = useRecoilState(selectedDeckAtom);
  const [token, setToken] = useRecoilState(userTokenAtom);
  const teamId = location.pathname.split('/')[2];
  const handleClose = () => {
    setDeleteDeckModalOpen(false);
  };
  const deleteDeck = () => {
    // 삭제된 덱 decks에서 없애기
    setDecks(decks.filter((d) => d.deckId !== selectedDeck?.deckId));
    axios
      .delete(API_URL + `/teams/${teamId}/decks`, {
        headers: { Authorization: `${token}` },
        data: { deckId: selectedDeck?.deckId },
      })
      .then((response: AxiosResponse) => {
        handleClose();
        // 여기서 삭제된 덱 decks에서 없앴는데 응답 오고 지우니까 느림
        setDecks(decks.filter((d) => d.deckId !== selectedDeck?.deckId));
        // setShowDropDown(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={handleClose}
      onEscapeKeydown={handleClose}
    >
      <Container>
        <Deckname>{selectedDeck?.deckname}</Deckname>
        <Body>정말로 이 덱을 지우시겠습니까? 덱 안의 모든 카드가 삭제됩니다. 그리고 이 창 디자인 좀 이상함</Body>
        <Buttons>
          <CancelButton onClick={() => handleClose()}>Cancel</CancelButton>
          <DeleteButton onClick={() => deleteDeck()}>Delete</DeleteButton>
        </Buttons>
      </Container>
    </Modal>
  );
}

export default React.memo(DeleteDeckModal);
