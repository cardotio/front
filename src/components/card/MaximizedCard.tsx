import { selectedCardAtom } from 'atoms';
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IoCaretBackOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Block from './Block';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
`;
const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
const Header = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f7f7f7;
  border-bottom: 1px solid lightgray;
`;
const Main = styled.div`
  padding: 20px;
`;
const TitleWrapper = styled.div`
  width: 100%;
  height: 100px;
`;
const Title = styled.input`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  font-weight: 700;
  line-height: 1.5;
  font-size: 40px;
  outline: none;
  background: transparent;
  border: none;
  cursor: text;
  min-height: 1em;
  &::placeholder {
    color: rgba(58, 56, 50, 0.15);
  }
`;
const BodyWrapper = styled.div``;

const initState = {
  pages: [
    {
      idx: 1,
      title: '기본페이지',
    },
    {
      idx: 2,
      title: 'page1',
    },
  ],
  views: {
    '1': [
      {
        type: 'title',
        text: '기본페이지',
      },
      {
        type: 'h1',
        text: '안녕하세요.',
      },
    ],
    '2': [
      {
        type: 'title',
        text: 'page1',
      },
    ],
  },
};

function MaximizedCard() {
  const navigate = useNavigate();
  const { teamid } = useParams();
  const [card, setCard] = useRecoilState(selectedCardAtom);

  return (
    <Wrapper>
      <Header>
        <IconContainer onClick={() => navigate(`/team/${teamid}`)}>
          <IoCaretBackOutline />
        </IconContainer>
      </Header>
      <Main>
        <TitleWrapper>
          <Title placeholder="제목 없음" defaultValue={card?.cardname} />
        </TitleWrapper>
        <BodyWrapper>
          <Block />
        </BodyWrapper>
      </Main>
    </Wrapper>
  );
}

export default React.memo(MaximizedCard);
