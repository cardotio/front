import React from 'react';
import styled from 'styled-components';
import { VscAdd } from 'react-icons/vsc';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 120px;
  margin-bottom: 14px;
  padding: 20px;
  background: #d5d5d521;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 10px;
  transition: 0.2s background, 0.4s z-index;
  cursor: pointer;
  &:hover {
    background: #00000047;
    z-index: 200;
    svg {
      fill: #fff;
      scale: 1.5;
    }
  }

  svg {
    fill: #999;
    scale: 1.5;
  }
`;

interface Props {
  onClick: React.MouseEventHandler<HTMLElement>;
}

function AddDeck(props: Props) {
  return (
    <Wrapper onClick={props.onClick}>
      <VscAdd />
    </Wrapper>
  );
}

export default React.memo(AddDeck);
