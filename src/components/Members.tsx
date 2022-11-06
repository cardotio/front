import {
  addMemberModalOpenAtom,
  myTeamsAtom,
  selectedTeamAtom,
  selectedUserAtom,
  teamMessagesAtom,
  userInfoAtom,
} from 'atoms';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeMember, TypeUserInfo } from 'types';
import { FcBusinessman } from 'react-icons/fc';
import { RiAddCircleFill } from 'react-icons/ri';
import Member from './Member';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const AddMemberButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin-bottom: 10px;
  //background: #ffffff;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  &:hover {
    background: #e7e7e7;
  }
  &:active {
    background: #d8d8d8;
  }
  span {
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    margin-left: 7px;
  }
`;

const MemberList = styled.div`
  border-bottom: 1px solid lightgray;
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

const AddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  margin-left: 10px;
  svg {
    scale: 2;
    fill: #a80038;
  }
`;

function Members() {
  const [myInfo, setMyInfo] = useRecoilState(userInfoAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const [members, setMembers] = useState<TypeMember[]>([]);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);
  const [addMemberModalOpen, setAddMemberModalOpen] = useRecoilState(
    addMemberModalOpenAtom,
  );

  const [teamMessages, setTeamMessages] = useRecoilState(teamMessagesAtom);
  const [unreads, setUnreads] = useState<number[]>([]);

  useEffect(() => {
    if (selectedTeam) {
      setMembers(
        selectedTeam.users?.filter(
          (user) => user.username !== myInfo?.username,
        ),
      );
    }
  }, [selectedTeam]);


  const getUnreadMessageCount = (user:TypeUserInfo) => {
    let count = 0;
    teamMessages.map(message => {
      if(message.unread == 0) {}
      else if(message.sender == user.username && message.receiver == myInfo?.username) {
        count ++;
      }
    })
    return count;
  }

  useEffect(() => {
    console.log('teammessage changed', teamMessages[teamMessages.length -1])
    if(!teamMessages) return;
    setUnreads(members?.map(user => {
      return getUnreadMessageCount(user);
    }));
  }, [teamMessages]);
  return (
    <Wrapper>
      {members?.length != 0 ? (
        <MemberList>
          {members?.map((user, i) => (
            <Member
              key={i}
              displayname={user.displayname}
              role={user.role}
              description={user?.description}
              unreadCount={unreads[i]}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </MemberList>
      ) : (
        ''
      )}

      <AddMemberButton onClick={() => setAddMemberModalOpen(true)}>
        <AddIconContainer>
          <RiAddCircleFill />
        </AddIconContainer>
        <span>Click to add new member</span>
      </AddMemberButton>
    </Wrapper>
  );
}

export default Members;
