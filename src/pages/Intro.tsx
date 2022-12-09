import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;
const ToLoginBtn = styled.div`
  flex-shrink: 0;
  height: 2rem;
  margin-top: 40vh;
  padding: 0 1.6rem;
  background-image: linear-gradient(
    92.88deg,
    #455eb5 9.16%,
    #5643cc 43.89%,
    #673fd7 64.72%
  );
  color: #ffffff;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  cursor: pointer;
  font-family: 'Inter UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8rem;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  transition: all 0.5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
    transition-duration: 0.1s;
  }

  @media (min-width: 768px) {
    padding: 0 2.6rem;
  }
`;

function Intro() {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <Wrapper>
      <ToLoginBtn onClick={toLogin}>Get Started</ToLoginBtn>
    </Wrapper>
  );
}

export default React.memo(Intro);
