import Cards from 'components/Cards';
import LeftSideBar from 'components/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  userTokenAtom,
  addTeamModalOpenAtom,
  userInfoAtom,
  myTeamsAtom,
  addCardModalOpenAtom,
} from 'atoms';
import AddTeamModal from 'components/AddTeamModal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import AddCardModal from 'components/AddCardModal';

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
  const [isMainFetching, setIsMainFetching] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
    const [addCardModalOpen, setAddCardModalOpen] =
      useRecoilState(addCardModalOpenAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token || token === '') navigate('/login');

    // GET USER INFO BY TOKEN
    async function fetchMainData() {
      setIsMainFetching(true);
      console.log('GET MY INFO: /users/me');
      await axios
        .get(API_URL + '/users/me', {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          console.log(response);
          setUserInfo(response.data);
          setMyTeams(response.data.teams);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });

      // GET Teamnames of the user
      // console.log('GET Teamnames: /users/teams');
      // await axios
      //   .get(API_URL + '/users/teams', {
      //     headers: {
      //       Authorization: `${token}`,
      //     },
      //   })
      //   .then((response: AxiosResponse) => {
      //     console.log(response);
      //     response.data.map((team: any) => {
      //       setMyTeams((prev) => [...prev, team.teamname]);
      //     });
      //   })
      //   .catch((error: AxiosError) => {
      //     console.log(error);
      //   });
      setIsMainFetching(false);
    }
    fetchMainData();
  }, []);

  const onAddCard = () => {
    setAddCardModalOpen(true);
  }

  return (
    <Wrapper>
      {!isMainFetching && <LeftSideBar />}
      <AddTeamModal isOpen={addTeamModalOpen} />
      <AddCardModal isOpen={addCardModalOpen} />
      {pathname.includes('/team/me') ? (
        <Container>
          <div>me</div>
        </Container>
      ) : (
        <>
        <button onClick={onAddCard}>Add Card</button>
          <Container>
            <Cards title={'하반기 결산 준비 🏝'} data={[1, 2, 3, 4, 5]} />
            <Cards title={'충돌 발생! 🚨'} data={[1, 2, 3]} />
            <Cards title={'요호'} data={[1, 2, 3, 4, 5, 6, 7]} />
            <Cards title={'요호'} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
          </Container>
        </>
      )}
      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
