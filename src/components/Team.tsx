import { API_URL } from 'api';
import {
  currentCardsAtom,
  currentUsersAtom,
  userInfoAtom,
  userTokenAtom,
  teamInfoFetchingAtom,
} from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Dropdown from 'rc-dropdown';
import Menu, { MenuItem } from 'rc-menu';
import React, { useState } from 'react';
import useCollapse from 'react-collapsed';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeTeam, TypeUserInfo } from 'types';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { FaBeer } from 'react-icons/fa';

const Wrapper = styled.div`
  padding: 5px 0;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const TeamHeading = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 0px;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;

  &:hover {
    background: #eeeeee;
  }

  span {
    font-weight: 600;
  }
`;

const CollapseMember = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-right: 8px;
  transition: all 0.2s linear;
  svg {
    scale: 0.8;
    fill: #6c6c6c;
    transition: transform 0.2s linear;
  }
  &:hover {
    background: #e5e5e5;
  }
`;

const Members = styled.div`
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const Member = styled.div`
  padding: 5px 10px;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
`;

interface TeamProps {
  team: TypeTeam;
}

function Team({ team }: TeamProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [cards, setCards] = useRecoilState(currentCardsAtom);
  const [teamInfoFetching, setTeamInfoFetching] =
    useRecoilState(teamInfoFetchingAtom);
  const navigate = useNavigate();

  const handleSelectTeam = () => {
    console.log(`GET TEAM INFO: /teams/${team.teamname}/cards`);
    setTeamInfoFetching(true);
    axios
      .get(API_URL + `/teams/${team.teamname}/cards`, {
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
    navigate(`/team/${team.teamname}`);
  };

  return (
    <Wrapper>
      <TeamHeading>
        <CollapseMember {...getToggleProps()}>
          {isExpanded ? (
            <Arrow
              style={{
                transform: 'rotate(90deg)',
              }}
            />
          ) : (
            <Arrow />
          )}
        </CollapseMember>
        {/* <span onClick={handleSelectTeam}>{team.teamname}</span> */}
        <Link
          to={`/team/${team.teamname}`}
          state={team}
          onClick={handleSelectTeam}
        >
          {team.teamname}
        </Link>
        <CollapseMember style={{ position: 'absolute', right: 0 }}>
          <FaBeer onClick={() => navigate(`/invite/${team.teamname}`)} />
        </CollapseMember>
      </TeamHeading>
      <Members {...getCollapseProps()}>
        {team.users?.map((user, i) => (
          <Member key={i}>{user.displayname}</Member>
        ))}
      </Members>
    </Wrapper>
  );
}

export default React.memo(Team);
