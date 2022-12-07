import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'styled-react-modal';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  addCardModalOpenAtom,
  userTokenAtom,
  addCardDeckAtom,
  deckListAtom,
} from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import Spinner from 'react-spinner-material';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 450px;
  padding: 20px 32px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
`;
const Header = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  margin-left: 3px;
`;
const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  width: 100%;
  margin-right: 20px;
`;
const Input = styled.input`
  all: unset;
  width: 100%;
  margin-right: 20px;
  padding: 8px 10px;
  margin-bottom: 0.5rem;
  border-radius: 3px;
  box-shadow: rgb(15 15 15 / 20%) 0px 0px 0px 1px inset;
  background: ${(props) => props.theme.inputColor};
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.9rem;
  border: none;
  outline: none;
  &::placeholder {
    font-weight: 100;
  }
`;
const Btn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 70px;
  height: 37px;
  padding: 7px 0;
  background: #66757f;
  outline: 0;
  border: 0;
  border-radius: 3px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: white;
  cursor: pointer;
  transition: 0.1s background-color;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  :hover {
    background-color: #525e66;
  }
  a {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 15px;
    font-weight: 300;
  }
`;
const ErrorMessageArea = styled.div`
  margin-top: 0.5rem;
  color: ${(props) => props.theme.errorTextColor};
  font-size: 0.75rem;
  line-height: 1rem;
`;

interface IModal {
  isOpen: boolean;
}

function AddCardModal({ isOpen }: IModal) {
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const [deckToAdd, setDeckToAdd] = useRecoilState(addCardDeckAtom);
  const [isFetching, setIsFetching] = useState(false);
  const location = useLocation();
  const teamId = location.pathname.split('/')[2];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ cardname }: any) => {
    console.log(`ADD Card: /teams/${teamId}/cards`);
    setIsFetching(true);
    axios
      .post(
        API_URL + `/teams/${teamId}/cards`,
        {
          cardname: cardname,
          content: '',
          type: 'private',
          deckId: deckToAdd?.deckId,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        const newCard: any = {
          cardId: response.data.cardId,
          cardname,
          content: '',
          creator: response.data.creator,
          deck: { deckId: deckToAdd!.deckId, deckname: deckToAdd!.deckname },
          deckId: null,
          team: response.data.team,
          type: response.data.type,
        };


        const changeDecks = [...decks];
        
        const changeDeckIndex = changeDecks.indexOf(changeDecks.filter((deck, index) => deck.deckId === deckToAdd?.deckId)[0]);
        const changeDeck = Object.assign({}, changeDecks.filter((deck, index) => deck.deckId === deckToAdd?.deckId)[0]);
  
        const changeCards = [...changeDeck.cards, newCard];
        changeDeck.cards = changeCards;

        console.log(changeDeckIndex);
        changeDecks.splice(changeDeckIndex, 1, changeDeck);

        setDecks(changeDecks);

        
        // setDecks((prev) => {
        //   return (prev = [
        //     ...[...prev].,
        //     {
        //       ...prev.find((deck) => deck.deckId === deckToAdd?.deckId)!,
        //       cards: [
        //         ...prev.find((deck) => deck.deckId === deckToAdd?.deckId)!
        //           .cards,
        //         newCard,
        //       ],
        //     },
        //   ]);
        // });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        // // Unauthorized
        // error.request.status === 401 && setIsAuth(false);
      })
      .finally(() => {
        setIsFetching(false);
        setAddCardModalOpen(false);
        setDeckToAdd(null);
      });
  };

  const handleClose = () => {
    setAddCardModalOpen(false);
  };

  useEffect(() => {
    console.log(decks);
  }, [decks])
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={handleClose}
      onEscapeKeydown={handleClose}
    >
      <Container>
        <Header>Create New Card</Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter Card Name"
            {...register('cardname', {
              required: true,
              maxLength: 20,
              minLength: 5,
            })}
          />
          <Btn type="submit">
            {isFetching ? (
              <Spinner radius={20} color={'#fff'} stroke={1} visible={true} />
            ) : (
              'Create'
            )}
          </Btn>
        </Form>
        {errors.cardname && (
          <ErrorMessageArea>카드 이름은 5 ~ 20자 입니다.</ErrorMessageArea>
        )}
      </Container>
    </Modal>
  );
}

export default React.memo(AddCardModal);
