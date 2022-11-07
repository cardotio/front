import React from 'react';
import { FcBusinessman } from 'react-icons/fc';
import styled from 'styled-components';

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 60px;
  padding: 7px;
  //background: #ffffff;
  //border: 0.1px solid black;
  //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  //border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background: #e7e7e7;
  }
  &:active {
    background: #d8d8d8;
  }
  span {
    font-family: 'IBM Plex Sans', 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    margin-left: 7px;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 45px;
  height: 45px;
  margin-right: 5px;
  border-radius: 45px;
  //border: 1px solid black;
  svg {
    width: 45px;
    height: 45px;
  }
`;
const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
   padding-bottom: 3px;
  height: 100%;
  gap: 5px;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  //border-bottom: 1px solid black;
`;
const Description = styled.div`
  font-family: 'IBM Plex Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
`;
const DisplayName = styled.div`
  font-family: 'IBM Plex Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 10px;
`;
const Role = styled.div`
  height: fit-content;
  transform: translateY(6px);
  margin-bottom: 2px;
  font-family: 'IBM Plex Sans', 'Noto Sans KR';
  font-style: normal;
  //font-weight: 700;
  font-size: 11px;
  line-height: 9px;
`;
const UnreadCount = styled.div<{unreadCount: number}>`
  display: ${({unreadCount}) => unreadCount>0 ? 'block' : 'none'};

 
    position: absolute;
    width: 18px;
    height: 18px;
 
    line-height: 18px;
    font-size: 10px;
    border-radius: 30px;
    background-color: #55AC68;
    color: #ffffff;
    text-align: center;
    top: -1px;
    right: -7px;
`

interface MemberProps {
  displayname?: string;
  role?: string;
  description?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  unreadCount: number;
}
function Member({ displayname, role, description, onClick, unreadCount }: MemberProps) {
  return (
    <MemberContainer onClick={onClick}>
      <ImageContainer style={{ border: unreadCount > 0 ?'1px solid #1B9927': 'none'}}>
        <UnreadCount unreadCount={unreadCount}>+{unreadCount}</UnreadCount>
        <FcBusinessman />
      </ImageContainer>
      <MemberInfo>
        <DisplayName>{displayname}</DisplayName>

        <Role>{role}</Role>
        
      </MemberInfo>
    </MemberContainer>
  );
}

export default React.memo(Member);
