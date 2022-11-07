import Deck from 'components/Deck';
import LeftSideBar from 'components/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  userTokenAtom,
  addTeamModalOpenAtom,
  userInfoAtom,
  myTeamsAtom,
  addCardModalOpenAtom,
  teamInfoFetchingAtom,
  settingModalOpenAtom,
  selectedTeamAtom,
  addMemberModalOpenAtom,
  deckListAtom,
  addDeckModalOpenAtom,
} from 'atoms';
import AddTeamModal from 'components/AddTeamModal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import AddCardModal from 'components/AddCardModal';
import TeamSettings from 'components/TeamSettings';
import { TypeCard, TypeDeck } from 'types';
import AddMemberModal from 'components/AddMemberModal';
import AddDeck from 'components/AddDeck';
import AddDeckModal from 'components/AddDeckModal';
import Spinner from 'react-spinner-material';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  transition: 0.3s all;
`;
const Container = styled.div`
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

function Main() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [addMemberModalOpen, setAddMemberModalOpen] = useRecoilState(
    addMemberModalOpenAtom,
  );
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [addDeckModalOpen, setAddDeckModalOpen] =
    useRecoilState(addDeckModalOpenAtom);
  const [settomgModalOpen, setSettomgModalOpen] =
    useRecoilState(settingModalOpenAtom);
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);
  const [teamInfoFetching, setTeamInfoFetching] =
    useRecoilState(teamInfoFetchingAtom);
  const teamId = useLocation().pathname.split('/')[2];

  useEffect(() => {
    if (!token || token === '') navigate('/login');

    // GET USER INFO BY TOKEN
    setTeamInfoFetching(true);
    console.log('GET MY INFO: /users/me');
    axios
      .get(API_URL + '/users/me', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response);
        setUserInfo(response.data);
        setMyTeams(response.data.teams);
        response.data.teams.length === 0 && setAddTeamModalOpen(true);
        if (teamId === 'me') {
          setSelectedTeam(response.data.teams[0]);
          navigate(`/team/${response.data.teams[0].teamId}`);
        } else {
          setSelectedTeam(
            response.data.teams.filter(
              (team: any) => team.teamId + '' === teamId,
            )[0],
          );
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      setTeamInfoFetching(true);
      // GET DECKS INFO
      console.log(`GET DECKS INFO: /teams/${selectedTeam!.teamId}/decks`);
      axios
        .get(API_URL + `/teams/${selectedTeam!.teamId}/decks`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          console.log(response);
          let decksData: TypeDeck[] = [];
          response.data.map((decks: any) => {
            decksData.push({ ...decks, cards: [] });
          });
          console.log(`GET CARDS INFO: /teams/${selectedTeam!.teamId}/cards`);
          axios
            .get(API_URL + `/teams/${selectedTeam!.teamId}/cards`, {
              headers: {
                Authorization: `${token}`,
              },
            })
            .then((response: AxiosResponse) => {
              console.log(response);
              response.data.map((card: TypeCard) => {
                decksData
                  .find((deck) => deck.deckId === card.deck?.deckId)
                  ?.cards.push(card);
              });
              setDecks(decksData);
            })
            .catch((error: AxiosError) => {
              console.log(error);
            });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => setTeamInfoFetching(false));
    }
  }, [selectedTeam]);

  const handleAddDeck = () => {
    setAddDeckModalOpen(true);
  };

  const handleChange = ({ source, destination }: DropResult) => {
    if (!destination) return;

    setDecks((prev) => {
      let decksCopy = [...prev];

      // Delete from src
      const srcCard = decks.find((deck) => deck.deckId === +source.droppableId)
        ?.cards[source.index];
      const srcDeckIndex = decksCopy.findIndex(
        (d) => d.deckId === srcCard?.deck.deckId,
      );

      decksCopy.splice(srcDeckIndex, 1, {
        ...decksCopy[srcDeckIndex],
        cards: decksCopy[srcDeckIndex].cards.filter(
          (c) => c.cardId !== srcCard?.cardId,
        ),
      });

      // Add to dst
      const dstDeck = decks.find(
        (deck) => deck.deckId === +destination.droppableId,
      );
      const dstDeckIndex = decksCopy.findIndex(
        (d) => d.deckId === dstDeck?.deckId,
      );
      let cardsCopy = [...decksCopy[dstDeckIndex].cards];

      cardsCopy.splice(destination.index, 0, {
        ...srcCard!,
        deck: {
          deckId: dstDeck!.deckId,
          deckname: dstDeck!.deckname,
        },
      });
      decksCopy.splice(dstDeckIndex, 1, {
        ...decksCopy[dstDeckIndex],
        cards: cardsCopy,
      });

      return decksCopy;
    });
  };

  return (
    <Wrapper>
      <LeftSideBar />
      <AddTeamModal isOpen={addTeamModalOpen} />
      <AddCardModal isOpen={addCardModalOpen} />
      <AddDeckModal isOpen={addDeckModalOpen} />
      <AddMemberModal isOpen={addMemberModalOpen} />
      <TeamSettings isOpen={settomgModalOpen} />
      <DragDropContext onDragEnd={handleChange}>
        <Container>
          {teamInfoFetching ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <Spinner radius={50} color={'#fff'} stroke={1} visible={true} />
            </div>
          ) : (
            <>
              {decks?.map((deck, i) => (
                <Deck key={i} deck={deck} />
              ))}
              <AddDeck onClick={handleAddDeck} />
            </>
          )}
        </Container>
      </DragDropContext>
      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
