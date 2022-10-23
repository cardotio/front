import { API_URL } from 'api';
import {
  currentCardsAtom,
  userTokenAtom,
  teamInfoFetchingAtom,
  selectedTeamAtom,
} from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeTeam } from 'types';
import { BsThreeDots } from 'react-icons/bs';

const Wrapper = styled.div`
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const TeamHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
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

const SettingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.125rem;
  &:hover {
    background: #cfcfcf;
  }
  svg {
    scale: 0.8;
    fill: #6c6c6c;
  }
`;

interface TeamProps {
  team: TypeTeam;
}

function Team({ team }: TeamProps) {
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
        <span>{team.teamname}</span>
        <SettingIcon>
          <BsThreeDots />
        </SettingIcon>
      </TeamHeading>
    </Wrapper>
  );
}

export default React.memo(Team);
