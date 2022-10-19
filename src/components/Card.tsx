import { motion, Variants } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { TypeCard } from 'types';

const Wrapper = styled(motion.div)`
  width: 180px;
  height: 120px;
  margin-bottom: 14px;
  padding: 20px;
  background: #f7f6e7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 10px;
  /* transform: rotate(45deg); */
  transition: 0.2s background, 0.4s z-index;
  cursor: pointer;
  &:hover {
    background: #deb887;
    z-index: 200;
  }
`;

interface CardProps {
  card: TypeCard;
}

function Card(props: CardProps) {
  return <Wrapper>{props.card.cardname}</Wrapper>;
}

export default React.memo(Card);
