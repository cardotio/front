import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from 'atoms';
import { ReactComponent as Logo } from '../images/logo.svg';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: ${(props) => props.theme.navBarColor};
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  padding: 10px 30px;
  transition: 0.2s background-color, 0.2s color;
  z-index: 1000;
`;
const LogoContainer = styled.div<{ isDark: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    path {
      fill: ${(props) => (props.isDark ? '#fff' : props.theme.mainColor)};
    }
  }
`;
const LogoTitle = styled.div`
  font-family: 'RocknRoll One', sans-serif;
  color: ${(props) => props.theme.textColor};
  margin-left: 10px;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: 0.1em;
`;
const RightItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Navbar() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Wrapper>
      <Link to={'/'}>
        <LogoContainer isDark={isDark}>
          <Logo />
          <LogoTitle>Card.io</LogoTitle>
        </LogoContainer>
      </Link>
      <RightItems></RightItems>
    </Wrapper>
  );
}

export default React.memo(Navbar);
