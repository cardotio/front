import React from 'react';
import useCollapse from 'react-collapsed';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
  teamId: number;
  teamname: string;
  members: {
    username: string;
    displayname: string;
    email: string;
  }[];
}

function Team(team: TeamProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <TeamHeading onClick={() => navigate(`/team/${team.teamId}`)}>
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
        {team.teamname}
      </TeamHeading>
      <Members {...getCollapseProps()}>
        {team.members.map((member, i) => (
          <Member key={i}>{member.displayname}</Member>
        ))}
      </Members>
    </Wrapper>
  );
}

export default React.memo(Team);
