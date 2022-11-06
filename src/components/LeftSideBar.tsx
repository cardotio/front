import {
  addTeamModalOpenAtom,
  myTeamsAtom,
  selectedTeamAtom,
  selectedUserAtom,
  showDropDownAtom,
} from 'atoms';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Members from './Members';
import Team from './Team';
import Teams from './Teams';
import { IoClose } from 'react-icons/io5';
import { Resizable } from 're-resizable';

import './style.css';

const Wrapper = styled.aside`
  
  color: ${(props) => props.theme.textColor};
`;
const DropDown = styled(motion.div)`
  position: absolute;
  top: 15px;
  left: 250px;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  min-height: 60px;
  max-height: 270px;
  padding: 10px;
  border-radius: 4px;
  background: white;
  max-width: calc(100vw - 24px);
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  overflow-y: auto;
  z-index: 10;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const CloseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #eeeeee;
  }
`;

function LeftSideBar() {
  const teamname = useLocation().pathname.split('/')[2];
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const [showDropDown, setShowDropDown] = useRecoilState(showDropDownAtom);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);

  const onAddTeam = () => {
    setAddTeamModalOpen(true);
  };

  return (
    <Resizable
    
    className='left-bar'
    defaultSize={{
      width: 250,
      height: '100%'
    }}
    minWidth={250} 
    maxWidth={700}
    enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
    handleClasses={{ right: 'resizer right-resizer' }}>
      <AnimatePresence>
        {showDropDown && (
          <DropDown
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CloseContainer onClick={() => setShowDropDown(false)}>
                <IoClose />
              </CloseContainer>
            </div>
            <div>
              {myTeams.map((team, i) => (
                <Team key={i} team={team} />
              ))}
            </div>
          </DropDown>
        )}
      </AnimatePresence>
      <Teams />
      <Members />
      <button onClick={onAddTeam}>+</button>
    </Resizable>
  );
}

export default React.memo(LeftSideBar);
