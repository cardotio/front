import { API_URL } from 'api';
import { currentCardsAtom, userTokenAtom, teamInfoFetchingAtom, selectedTeamAtom } from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import useCollapse from 'react-collapsed';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeTeam } from 'types';
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
  padding: 5px;
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

const CollapseMember = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-right: 8px;
  transition: all 0.2s linear;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
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
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const navigate = useNavigate();

  const handleSelectTeam = (e: any) => {
    function fetchData() {
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
    }
    setSelectedTeam(team);
    e.target.tagName !== 'svg' && e.target.tagName !== 'path' && fetchData();
  };

  return (
    <Wrapper onClick={handleSelectTeam}>
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
        <span>{team.teamname}</span>
        <CollapseMember style={{ position: 'absolute', right: 0 }}>
          <FaBeer />
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
