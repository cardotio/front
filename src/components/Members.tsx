import { myTeamsAtom, selectedUserAtom } from 'atoms';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeMember } from 'types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MemberContainer = styled.div`
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
        <MemberContainer 
          onClick={() => setSelectedUser(user)}
          key={i}>
          <div>{user.displayname}</div>
          <div>{user.role}</div>
        </MemberContainer>
      ))}
    </Wrapper>
  );
}

export default Members;
