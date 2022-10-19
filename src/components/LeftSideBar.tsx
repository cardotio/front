import { addTeamModalOpenAtom, myTeamsAtom, userInfoAtom } from 'atoms';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeTeam } from 'types';
import Team from './Team';
import Teams from './Teams';

const Wrapper = styled.aside`
  min-width: 240px;
  height: 100vh;
  background: #f7f7f7;
  padding: 15px 5px;
  border-right: 1px solid lightgray;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
`;

interface LeftBarProps {
  isFetching: boolean;
}

function LeftSideBar({ isFetching }: LeftBarProps) {
  const teamname = useLocation().pathname.split('/')[2];
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);

  const onAddTeam = () => {
    setAddTeamModalOpen(true);
  };

  return (
    <Wrapper>
      {isFetching ? (
        <div>Loading</div>
      ) : (
        <>
          <Teams teamname={teamname} />
        </>
      )}
      <button onClick={onAddTeam}>+</button>
    </Wrapper>
  );
}

export default React.memo(LeftSideBar);
