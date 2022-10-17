import { API_URL } from 'api';
import { currentCardsAtom, currentUsersAtom, userTokenAtom } from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';
import useCollapse from 'react-collapsed';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeUserInfo } from 'types';
import { ReactComponent as Arrow } from '../images/arrow.svg';

const Wrapper = styled.div`
  padding: 5px 0;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const TeamHeading = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;

  div {
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
  }
  span {
    font-weight: 600;
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
  teamname: string;
}

function Team({teamname}: TeamProps) {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [cards, setCards] = useRecoilState(currentCardsAtom);
  const [users, setUsers] = useState<TypeUserInfo[] | null>(null);
  const navigate = useNavigate();

  const handleSelectTeam = () => {
    console.log(`GET TEAM INFO: /teams/${teamname}`);
    axios
        .get(API_URL + `/teams/${teamname}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          console.log(response);
          setUsers(response.data.users);
          setCards(response.data.cards)
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    navigate(`/team/${teamname}`);
  }
  
  return (
    <Wrapper>
      <TeamHeading onClick={handleSelectTeam}>
        <div {...getToggleProps()}>
          {isExpanded ? (
            <Arrow
              style={{
                transform: 'rotate(90deg)',
              }}
            />
          ) : (
            <Arrow />
          )}
        </div>
        <span>{teamname}</span>
      </TeamHeading>
      <Members {...getCollapseProps()}>
        {users?.map((member, i) => (
          <Member key={i}>{member.displayname}</Member>
        ))}
      </Members>
    </Wrapper>
  );
}

export default React.memo(Team);
