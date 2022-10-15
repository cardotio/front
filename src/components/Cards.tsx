import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  Variants,
} from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled(motion.div)`
  width: 180px;
  height: 36px;
  margin-bottom: 14px;
  border-radius: 12px;
  background: #dbe6ff;
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-family: 'Gothic A1', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 36px;
  z-index: 100;
`;
const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;
// const Card = styled(motion.div)`
//   position: absolute;
//   width: 180px;
//   height: 120px;
//   margin-bottom: 14px;
//   background: #f7f6e7;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 10px;
//   transform: rotate(45deg);
//   transition: 0.2s background;
//   cursor: pointer;
//   &:hover {
//     background: #deb887;
//   }
// `;

const vCards: Variants = {
  initial: {},
  animate: {},
  hover: {},
};
const title: Variants = {
  initial: {
    y: 88,
  },
  animate: {},
  hover: {
    y: 0,
    transition: {
      type: 'spring',
      velocity: 10,
      stiffness: 50,
    },
  },
};

interface CardsProps {
  title: string;
  data: number[];
}

function Cards(props: CardsProps) {
  return (
    <Wrapper
      variants={vCards}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Title variants={title}>{props.title}</Title>
      <CardContainer>
        {props.data.map((card, i) => (
          <Card key={i} id={i} total={props.data.length} />
        ))}
      </CardContainer>
    </Wrapper>
  );
}

export default React.memo(Cards);
