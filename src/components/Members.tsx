import { myTeamsAtom, selectedUserAtom } from 'atoms';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeMember } from 'types';
import { FcBusinessman } from 'react-icons/fc';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin-bottom: 10px;
  padding: 7px;
  background: #ffffff;
  border: 0.1px solid black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
  &:active {
    background: #d8d8d8;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  margin-right: 5px;
  border-radius: 45px;
  border: 1px solid black;
  svg {
    width: 45px;
    height: 45px;
  }
`;
const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  border-bottom: 1px solid black;
`;
const Description = styled.div`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
`;
const DisplayName = styled.div`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 17px;
`;
const Role = styled.div`
  height: fit-content;
  transform: translateY(6px);
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 7px;
  line-height: 9px;
`;

interface props {
  teamname: string;
}

function Members({ teamname }: props) {
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const [users, setUsers] = useState<TypeMember[]>([]);

  console.log(myTeams.filter((team) => team.teamname === teamname));

  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);

  useEffect(() => {
    myTeams.filter((team) => team.teamname === teamname).length > 0 &&
      setUsers(myTeams.filter((team) => team.teamname === teamname)[0].users);
  });

  return (
    <Wrapper>
      {users?.map((user, i) => (
        <MemberContainer key={i} onClick={() => setSelectedUser(user)}>
          <ImageContainer>
            <FcBusinessman />
          </ImageContainer>
          <MemberInfo>
            <Header>
              <DisplayName>{user.displayname}</DisplayName>
              <Role>{user.role}</Role>
            </Header>
            <Description>{user.email}</Description>
          </MemberInfo>
        </MemberContainer>
      ))}
    </Wrapper>
  );
}

export default Members;
