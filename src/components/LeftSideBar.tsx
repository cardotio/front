import { addTeamModalOpenAtom, myTeamsAtom, userInfoAtom } from 'atoms';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeTeam } from 'types';
import Team from './Team';

const Wrapper = styled.aside`
  min-width: 240px;
  height: 100vh;
  background: #f7f7f7;
  padding: 15px;
  border-right: 1px solid lightgray;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    padding: 10px 15px;
    border-radius: 0.125rem;
    font-size: 14px;
    font-family: 'Noto sans KR';
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    &:hover {
      background: #e7e7e7;
    }
  }
`;
const Teams = styled.div`
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

function LeftSideBar() {
  const navigate = useNavigate();
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);

  const onAddTeam = () => {
    setAddTeamModalOpen(true);
  };
  
  return (
    <Wrapper>
      <Header>
        <div onClick={() => navigate('/team/me')}>
          {`${userInfo.displayname}님의 workspace`}
        </div>
        <button onClick={onAddTeam}>+</button>
      </Header>
      <Teams>
        {myTeams.map((teamname, i) => (
          <Team key={i} teamname={teamname} />
        ))}
      </Teams>
    </Wrapper>
  );
}

export default React.memo(LeftSideBar);
