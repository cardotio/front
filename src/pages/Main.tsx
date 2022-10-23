import Deck from 'components/Deck';
import LeftSideBar from 'components/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  userTokenAtom,
  addTeamModalOpenAtom,
  userInfoAtom,
  myTeamsAtom,
  addCardModalOpenAtom,
  currentCardsAtom,
  teamInfoFetchingAtom,
  settingModalOpenAtom,
  selectedTeamAtom,
} from 'atoms';
import AddTeamModal from 'components/AddTeamModal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import AddCardModal from 'components/AddCardModal';
import AddCard from 'components/AddCard';
import TeamSettings from 'components/TeamSettings';
import { TypeCard, TypeDeck } from 'types';
import { AnyNsRecord } from 'dns';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
  min-width: 520px;
  width: 100%;
  height: 100%;
  padding: 36px 50px;
`;

function Main() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [isFetching, setIsFetching] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [settomgModalOpen, setSettomgModalOpen] =
    useRecoilState(settingModalOpenAtom);
  const [cards, setCards] = useRecoilState(currentCardsAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const [teamInfoFetching, setTeamInfoFetching] =
    useRecoilState(teamInfoFetchingAtom);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token || token === '') navigate('/login');
    pathname === '/team/me' && setAddTeamModalOpen(true);

    // GET USER INFO BY TOKEN
    setIsFetching(true);
    console.log('GET MY INFO: /users/me');
    axios
      .get(API_URL + '/users/me', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        setUserInfo(response.data);
        setMyTeams(response.data.teams);

        console.log(
          `GET TEAM INFO: /teams/${response.data.teams[0].teamname}/cards`,
        );
        setTeamInfoFetching(true);
        axios
          .get(API_URL + `/teams/${response.data.teams[0].teamname}/cards`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((response: AxiosResponse) => {
            console.log(response);
            setCards(response.data);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          })
          .finally(() => setTeamInfoFetching(false));

        setSelectedTeam(response.data.teams[0]);
        navigate(`/team/${response.data.teams[0].teamname}`);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    setIsFetching(false);
  }, []);

  const handleAddCard = () => {
    setAddCardModalOpen(true);
  };



  // const test: TypeCard[] = [
  //   {
  //     cardname: 'cardcard',
  //     content: 'test',
  //     type: 'public',
  //     user: {
  //       username: 'han',
  //       displayname: 'han',
  //       email: 'akjfdsklaj@akj.com',
  //     },
  //     team: {
  //       teamname: 'cardio',
  //     },
  //   },
  //   {
  //     cardname: 'cardcard2',
  //     content: 'test',
  //     type: 'public',
  //     user: {
  //       username: 'han',
  //       displayname: 'han',
  //       email: 'akjfdsklaj@akj.com',
  //     },
  //     team: {
  //       teamname: 'cardio',
  //     },
  //   },
  // ];

  const deckTest: TypeDeck[] = [
    {
      deckname: "deck1",
      deckid: "deck1",
      cards: cards
    },
    {
      deckname: "deck2",
      deckid: "deck2",
      cards: cards
    }
  ]

  // const result = {
  //   draggableId: 'task-1',
  //   type: "TYPE",
  //   reason: "DROP",
  //   source: {
  //     droppableId: 'column-1',
  //     index: 0,
  //   },
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1,
  //   },
  // };

  const OnDragEnd = (result: any) => {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    const deck: any = deckTest.find(e => e.deckname === source.droppableId);
    const draggingCard: any = deck.cards.find(e => e.cardname === draggableId.replace(deck.deckname, ""))
    // const cardIds = deck.cards.map((card) => {
    //   return card.cardname + deck.deckname
    // })
    const newCards = Array.from(deck.cards);
    newCards.splice(source.index, 1);
    newCards.splice(destination.index, 0, draggingCard);
    console.log(deck, draggingCard)
    const newDeck = {
      ...deck,
      cards: newCards,
    };
  };

  return (
    <Wrapper>
      <LeftSideBar isFetching={isFetching} />
      <AddTeamModal isOpen={addTeamModalOpen} />
      <AddCardModal isOpen={addCardModalOpen} />
      <TeamSettings isOpen={settomgModalOpen} />
      {teamInfoFetching ? (
        <div style={{ color: 'white' }}>Loading...</div>
      ) : (
        <DragDropContext onDragEnd={OnDragEnd}>
          <Container>
            <AddCard onClick={handleAddCard} />
            {deckTest.slice(0, deckTest.length).map((deck, i) => (
                  <Deck key={i} title={deck.deckname} data={deck.cards} index={i}></Deck>
                ))}
          </Container>
        </DragDropContext>
      )}
      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
