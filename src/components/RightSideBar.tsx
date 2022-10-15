import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
  min-width: 240px;
  height: 100%;
  background: #9c2929;
`;

function RightSideBar() {
  return <Wrapper>Right</Wrapper>;
}

export default React.memo(RightSideBar);
