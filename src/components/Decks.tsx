import { getCards, getDecks } from 'api';
import { addDeckModalOpenAtom, deckListAtom, userTokenAtom } from 'atoms';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeDeck } from 'types';
import AddCard from './AddCard';
import AddDeck from './AddDeck';
import Card from './Card';
import Deck from './Deck';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  min-width: 250px;
  width: 100%;
  height: 100%;
  padding: 36px 50px;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function Decks() {
  const [token, setToken] = useRecoilState(userTokenAtom);
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

  return (
    <Wrapper>
      {decks?.map((deck, i) => (
        <Deck key={i} deck={deck} />
      ))}
      <AddDeck onClick={() => setAddDeckModalOpen(true)} />
    </Wrapper>
  );
}

export default Decks;
