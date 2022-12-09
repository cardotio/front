import {
  contentsAtom,
  currentLineAtom,
  deckListAtom,
  selectedCardAtom,
  userTokenAtom,
} from 'atoms';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IoCaretBackOutline } from 'react-icons/io5';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Block from './Block';
import { TypeBlock, TypeCard } from 'types';
import axios from 'axios';
import { API_URL } from 'api';
import { RepeatOneSharp } from '@mui/icons-material';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
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
const BodyWrapper = styled.div`
  height: 100%;
`;

const initContents: TypeBlock[] = [
  {
    type: 'none',
    color: '#000000',
    text: 'abc',
  },
  {
    type: 'none',
    color: '#000000',
    text: '',
  },
  {
    type: 'br',
    color: '#000000',
    text: '',
  },
  {
    type: 'h1',
    color: '#ad0a0a',
    text: '안녕하세요.',
  },
  {
    type: 'h2',
    color: '#3b0aad',
    text: '안녕히계세요.',
  },
  {
    type: 'h3',
    color: '#28aa5e',
    text: '안녕히 가세요.',
  },
  {
    type: 'none',
    color: '#000000',
    text: '',
  },
];

function MaximizedCard() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const { teamid } = useParams();
  const [card, setCard] = useRecoilState(selectedCardAtom);
  const [contents, setContents] = useRecoilState(contentsAtom);
  const [currentLine, setCurrentLine] = useRecoilState(currentLineAtom);
  const [searchParams] = useSearchParams();
  const cid = searchParams.get('card');

  const handleWrapperClick = (e: any) => {
    if (e.target.type != 'text') setCurrentLine(contents.length - 1);
  };

  const handleSave = () => {
    axios
      .put(
        API_URL + `/teams/${teamid}/cards`,
        {
          cardId: 1,
          cardname: card?.cardname,
          content: JSON.stringify(contents),
          type: 'public',
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(API_URL + `/teams/${teamid}/cards`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setCard(
          response.data.find((card: TypeCard) => card.cardId + '' === cid),
        );
        setContents(
          JSON.parse(
            response.data.find((card: TypeCard) => card.cardId + '' === cid)
              .content,
          ),
        );
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setContents([
        {
          type: 'none',
          color: '#000000',
          text: '',
        },
      ]);
    };
  }, []);

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
        <BodyWrapper onClick={handleWrapperClick}>
          {contents.map((content, i) => (
            <Block key={i} index={i} content={content} />
          ))}
          <button onClick={handleSave}>Save</button>
        </BodyWrapper>
      </Main>
    </Wrapper>
  );
}

export default React.memo(MaximizedCard);
