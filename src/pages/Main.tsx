import Cards from 'components/Cards';
import LeftSideBar from 'components/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React, { Suspense, useEffect, useState } from 'react';
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
} from 'atoms';
import AddTeamModal from 'components/AddTeamModal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import AddCardModal from 'components/AddCardModal';
import Card from 'components/Card';
import AddCard from 'components/AddCard';

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

const CardsGrid = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #00000050;
`;

function Main() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isFetching, setIsFetching] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [cards, setCards] = useRecoilState(currentCardsAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const [teamInfoFetching, setTeamInfoFetching] =
    useRecoilState(teamInfoFetchingAtom);
  const { pathname } = useLocation();

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

  return (
    <Wrapper>
      <LeftSideBar isFetching={isFetching} />
      <AddTeamModal isOpen={addTeamModalOpen} />
      <AddCardModal isOpen={addCardModalOpen} />
      {teamInfoFetching ? (
        <div style={{ color: 'white' }}>Loading...</div>
      ) : (
        <Container>
          {cards.map((card, i) => (
            <Card key={i} card={card} />
          ))}
          <AddCard onClick={handleAddCard} />
        </Container>
      )}
      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
