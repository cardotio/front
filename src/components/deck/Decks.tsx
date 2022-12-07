import { getCards, getDecks } from 'api';
import {
  addDeckModalOpenAtom,
  deckListAtom,
  selectedTeamAtom,
  userTokenAtom,
} from 'atoms';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import AddCard from 'components/AddCard';
import AddDeck from 'components/AddDeck';
import Card from 'components/CardPreview';
import Deck from 'components/deck/Deck';

import ScrollContainer from 'react-indiana-drag-scroll';

import useDragScroll from 'dragScroll';
import { Scrollbar } from 'react-scrollbars-custom';

import 'components/style.css';

const srollbarStyle = {};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  min-width: 250px;
  width: 100%;
  background: #282c34;
  height: 100%;

  padding: 36px 50px;
  flex-wrap: wrap;
`;

const Description = styled.div`
  display: flex;
  height: 10vh;
  flex-direction: column;
  gap: 10px;
`;

const Sub = styled.div`
  color: #6b778c;
`;
const Main = styled.div`
  color: #172b4d;
  font-size: 30px;
`;

const DeckList = styled.div`
  display: inline-flex;
  margin: 8px;
`;

function Decks() {
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const teamId = useLocation().pathname.split('/')[2];
  const [addDeckModalOpen, setAddDeckModalOpen] =
    useRecoilState(addDeckModalOpenAtom);
  const [decks, setDecks] = useRecoilState(deckListAtom);

  const { data: decksData } = useQuery(['decks', teamId], () =>
    getDecks(token, teamId),
  );
  const { data: cardsData } = useQuery(['cards', teamId], () =>
    getCards(token, teamId),
  );

  const containerRef = useRef(null);

  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {
    // console.log(decksData, cardsData);
    if (decksData && cardsData) {
      let decksCopy: TypeDeck[] = [];
      decksData.data.map((d) => {
        decksCopy.push({
          ...d,
          cards: cardsData.data.filter((c) => c.deck?.deckId === d.deckId),
        });
      });
      setDecks(decksCopy);
    }
  }, [decksData, cardsData]);

  addEventListener('keydown', (e) => {
    
    if(e.keyCode == 17) {
      
      setIsSpacePressed(true);
    }
  });
  addEventListener('keyup', (e) => {
    if(e.keyCode == 17) setIsSpacePressed(false);
  });
  return (
    <ScrollContainer 
      vertical={isSpacePressed}
      horizontal={isSpacePressed}
      hideScrollbars={false}
      style={{
        background: "#282c34",
        width: "100%",
        height: "100%",
        overflow: "overlay"
      }} className="scroll-container">
        <DeckList>
          {decks?.map((deck, i) => (
            <Deck key={i} deck={deck} />
          ))}
          <AddDeck onClick={() => setAddDeckModalOpen(true)} />
        </DeckList>
    
    </ScrollContainer>
  );
}

export default Decks;
