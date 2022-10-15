import React from 'react';
import styled from 'styled-components';

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
  padding: 10px;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
`;
const Teams = styled.div`
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const Team = styled.div`
  padding: 10px 0;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const TeamName = styled.div`
  padding: 10px;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
`;
const Members = styled.div`
  padding: 10px;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;
const Member = styled.div`
  padding: 10px;
  border-radius: 0.125rem;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
`;

function LeftSideBar() {
  return (
    <Wrapper>
      <Header>노준석님의 workspace</Header>
      <Teams>
        <Team>
          <TeamName>Team1</TeamName>
          <Members>
            <Member>member1</Member>
            <Member>member2</Member>
            <Member>member3</Member>
            <Member>member4</Member>
          </Members>
        </Team>
        <Team>
          <TeamName>Team2</TeamName>
          <Members>
            <Member>member1</Member>
            <Member>member2</Member>
            <Member>member3</Member>
            <Member>member4</Member>
          </Members>
        </Team>
      </Teams>
    </Wrapper>
  );
}

export default React.memo(LeftSideBar);
