import Cards from 'components/Cards';
import LeftSideBar from 'components/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 60px;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  min-width: 520px;
  width: 100%;
  height: 100%;
  padding: 30px 0;
`;

function Main() {
  return (
    <Wrapper>
      <LeftSideBar />
      <Container>
        <Cards title={'하반기 결산 준비 🏝'} data={[1, 2, 3, 4, 5]} />
        <Cards title={'충돌 발생! 🚨'} data={[1, 2, 3]} />
        <Cards title={'요호'} data={[1, 2, 3, 4, 5, 6, 7]} />
        <Cards title={'요호'} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </Container>
      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
