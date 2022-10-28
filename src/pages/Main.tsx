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
} from 'atoms';
import AddTeamModal from 'components/AddTeamModal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import AddCardModal from 'components/AddCardModal';
import AddCard from 'components/AddCard';
import TeamSettings from 'components/TeamSettings';
import { TypeCard } from 'types';
import AddMemberModal from 'components/AddMemberModal';

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
  const [addMemberModalOpen, setAddMemberModalOpen] = useRecoilState(
    addMemberModalOpenAtom,
  );
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [settomgModalOpen, setSettomgModalOpen] =
    useRecoilState(settingModalOpenAtom);
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

        console.log(
          `GET TEAM INFO: /teams/${response.data.teams[0].teamId}/cards`,
        );
        setTeamInfoFetching(true);
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
          })
          .finally(() => setTeamInfoFetching(false));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => setIsFetching(false));
  }, []);

  const handleAddCard = () => {
    setAddCardModalOpen(true);
  };

  const test: TypeCard[] = [
    {
      cardname: 'cardcard',
      content: 'test',
      type: 'public',
      user: {
        username: 'han',
        displayname: 'han',
        email: 'akjfdsklaj@akj.com',
      },
      team: {
        teamname: 'cardio',
      },
    },
    {
      cardname: 'cardcard2',
      content: 'test',
      type: 'public',
      user: {
        username: 'han',
        displayname: 'han',
        email: 'akjfdsklaj@akj.com',
      },
      team: {
        teamname: 'cardio',
      },
    },
  ];

  const OnDragEnd = () => {};

  return (
    <Wrapper>
      <LeftSideBar />
      <AddTeamModal isOpen={addTeamModalOpen} />
      <AddCardModal isOpen={addCardModalOpen} />
      <AddMemberModal isOpen={addMemberModalOpen} />
      <TeamSettings isOpen={settomgModalOpen} />
      {teamInfoFetching ? (
        <div style={{ color: 'white' }}>Loading...</div>
      ) : (
        <DragDropContext onDragEnd={OnDragEnd}>
          <Container>
            <AddCard onClick={handleAddCard} />
            <Deck title={'deck1'} data={test} index={1}></Deck>
            <Deck title={'deck2'} data={test} index={2}></Deck>
            {/* {cards.map((card, i) => (
                <Card key={i} index={i} card={card} />
              ))} */}
          </Container>
        </DragDropContext>
      )}
      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
