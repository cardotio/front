import Cards from 'components/Cards';
import LeftSideBar from 'components/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { userTokenAtom, addTeamModalOpenAtom, userInfoAtom } from 'atoms';
import AddTeamModal from 'components/AddTeamModal';
import axios from 'axios';
import { API_URL } from 'api';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-top: 60px; */
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
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token || token === '') navigate('/login');
    // GET USER INFO BY TOKEN
    // GET TEAM INFO BY TOKEN
  }, [token]);

  return (
    <Wrapper>
      <LeftSideBar />
      <AddTeamModal isOpen={addTeamModalOpen} />
      {pathname.includes('/team/me') ? (
        <Container>
          <div>me</div>
        </Container>
      ) : (
        <Container>
          <Cards title={'하반기 결산 준비 🏝'} data={[1, 2, 3, 4, 5]} />
          <Cards title={'충돌 발생! 🚨'} data={[1, 2, 3]} />
          <Cards title={'요호'} data={[1, 2, 3, 4, 5, 6, 7]} />
          <Cards title={'요호'} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        </Container>
      )}

      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
