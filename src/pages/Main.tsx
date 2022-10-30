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
  addMemberModalOpenAtom,
  deckListAtom,
  addDeckModalOpenAtom,
} from 'atoms';
import AddTeamModal from 'components/AddTeamModal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import AddCardModal from 'components/AddCardModal';
import AddCard from 'components/AddCard';
import TeamSettings from 'components/TeamSettings';
import { TypeCard } from 'types';
import AddMemberModal from 'components/AddMemberModal';
import AddDeck from 'components/AddDeck';
import AddDeckModal from 'components/AddDeckModal';

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
  align-content: flex-start;
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
  const [addMemberModalOpen, setAddMemberModalOpen] = useRecoilState(
    addMemberModalOpenAtom,
  );
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [addDeckModalOpen, setAddDeckModalOpen] =
    useRecoilState(addDeckModalOpenAtom);
  const [settomgModalOpen, setSettomgModalOpen] =
    useRecoilState(settingModalOpenAtom);
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const [cards, setCards] = useRecoilState(currentCardsAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const [teamInfoFetching, setTeamInfoFetching] =
    useRecoilState(teamInfoFetchingAtom);
  const teamId = useLocation().pathname.split('/')[2];

  useEffect(() => {
    if (!token || token === '') navigate('/login');

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
        response.data.teams.length === 0 && setAddTeamModalOpen(true);
        if (teamId === 'me') {
          setSelectedTeam(response.data.teams[0]);
          navigate(`/team/${response.data.teams[0].teamId}`);
        } else {
          setSelectedTeam(
            response.data.teams.filter(
              (team: any) => team.teamId + '' === teamId,
            )[0],
          );
        }
        setTeamInfoFetching(true);
        // GET CARDS INFO
        console.log(
          `GET CARDS INFO: /teams/${response.data.teams[0].teamId}/cards`,
        );
        axios
          .get(API_URL + `/teams/${response.data.teams[0].teamId}/cards`, {
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
          });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => setIsFetching(false));
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      // GET DECKS INFO
      console.log(`GET DECKS INFO: /teams/${selectedTeam.teamId}/decks`);
      axios
        .get(API_URL + `/teams/${selectedTeam.teamId}/decks`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          console.log(response);
          setDecks(response.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  }, [selectedTeam]);

  const handleAddCard = () => {
    setAddCardModalOpen(true);
  };
  const handleAddDeck = () => {
    setAddDeckModalOpen(true);
  };

  const OnDragEnd = () => {};

  // decks?.map((deck) => {
  //   console.log(cards.filter((card) => card.deck?.deckId === deck.deckId));
  // });

  return (
    <Wrapper>
      <LeftSideBar />
      <AddTeamModal isOpen={addTeamModalOpen} />
      <AddCardModal isOpen={addCardModalOpen} />
      <AddDeckModal isOpen={addDeckModalOpen} />
      <AddMemberModal isOpen={addMemberModalOpen} />
      <TeamSettings isOpen={settomgModalOpen} />
      {teamInfoFetching ? (
        <div style={{ color: 'white' }}>Loading...</div>
      ) : (
        <DragDropContext onDragEnd={OnDragEnd}>
          <Container>
            {/* <Deck title={'deck1'} data={null} index={1}></Deck>
            <Deck title={'deck2'} data={test} index={2}></Deck> */}
            {/* {cards.map((card, i) => (
                <Card key={i} index={i} card={card} />
              ))} */}
            {/* <AddCard onClick={handleAddCard} /> */}
            {decks?.map((deck, i) => (
              <Deck key={i} deck={deck} />
            ))}
            <AddDeck onClick={handleAddDeck} />
          </Container>
        </DragDropContext>
      )}
      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
