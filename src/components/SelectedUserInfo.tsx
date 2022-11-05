import React from "react";
import { FcBusinessman } from "react-icons/fc";
import styled from "styled-components";

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 7px;
  //background: #ffffff;
  //border: 0.1px solid black;
  //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  //border-radius: 10px;
  box-sizing: border-box;
  
  span {
    font-family: 'IBM Plex Sans';
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
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  //border-bottom: 1px solid black;
`;
const Description = styled.div`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
`;
const DisplayName = styled.div`
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
`;
const Role = styled.div`
  height: fit-content;
  transform: translateY(6px);
  margin-bottom: 2px;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  //font-weight: 700;
  font-size: 11px;
  line-height: 9px;
`;

interface MemberProps {
  displayname?: string;
  role?: string;
  description?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}
function SelectedUserInfo({ displayname, role, description, onClick }: MemberProps) {
  return (
    <MemberContainer>
      <ImageContainer>
        <FcBusinessman />
      </ImageContainer>
      <MemberInfo>

        <DisplayName>{displayname}</DisplayName>

        <Role>{role}</Role>
      </MemberInfo>
    </MemberContainer>
  )
}

export default React.memo(SelectedUserInfo);