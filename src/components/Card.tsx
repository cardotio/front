import { motion, Variants } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  position: absolute;
  width: 180px;
  height: 120px;
  margin-bottom: 14px;
  background: #f7f6e7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 10px;
  transform: rotate(45deg);
  transition: 0.2s background;
  cursor: pointer;
  &:hover {
    background: #deb887;
  }
`;

interface CardProps {
  total: number;
  id: number;
}

function Card(props: CardProps) {
  const card: Variants = {
    initial: {
      y: 0,
      rotate: (20 / props.total) * props.id,
    },
    animate: {},
    hover: {
      y: 20 * props.id,
      rotate: 0,
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return <Wrapper variants={card}></Wrapper>;
}

export default React.memo(Card);
