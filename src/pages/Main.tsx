import LeftSideBar from 'components/leftsidebar/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React, { Suspense, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  userTokenAtom,
  addTeamModalOpenAtom,
  userInfoAtom,
  addCardModalOpenAtom,
  settingModalOpenAtom,
  selectedTeamAtom,
  addMemberModalOpenAtom,
  deckListAtom,
  addDeckModalOpenAtom,
  detailCardModalOpenAtom,
} from 'atoms';
import AddTeamModal from 'components/modals/AddTeamModal';
import { getUserInfo } from 'api';
import AddCardModal from 'components/modals/AddCardModal';
import TeamSettings from 'components/leftsidebar/TeamSettings';
import AddMemberModal from 'components/modals/AddMemberModal';

import AddDeckModal from 'components/modals/AddDeckModal';
import Spinner from 'react-spinner-material';
import MaximizedCard from 'components/MaximizedCard';
import DetailCardModal from 'components/modals/DetailCardModal';
import { useQuery } from 'react-query';
import Decks from 'components/Decks';
import Loading from 'components/Loading';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;

const DeckContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 5px;
`;

function Main() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [addDeckModalOpen, setAddDeckModalOpen] =
    useRecoilState(addDeckModalOpenAtom);
  const [addMemberModalOpen, setAddMemberModalOpen] = useRecoilState(
    addMemberModalOpenAtom,
  );
  const [detailCardModalOpen, setDetailCardModalOpen] = useRecoilState(
    detailCardModalOpenAtom,
  );
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [settomgModalOpen, setSettomgModalOpen] =
    useRecoilState(settingModalOpenAtom);
  const [decks, setDecks] = useRecoilState(deckListAtom);
  const teamId = useLocation().pathname.split('/')[2];

  const { data: userInfoData } = useQuery(['user'], () => getUserInfo(token));

  const onDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination) return;

    if (type == 'deck') (
      console.log("deck")
    );

    setDecks((prev) => {
      let decksCopy = [...prev];

      // Delete from src
      const srcCard = decks.find((deck) => deck.deckId === +source.droppableId)
        ?.cards[source.index];
      const srcDeckIndex = decksCopy.findIndex(
        (d) => d.deckId === srcCard?.deck?.deckId,
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

  useEffect(() => {
    if (!token || token === '') navigate('/login');
  }, [token]);

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData.data);
      const temp = userInfoData.data.teams[0];
      if (teamId === 'me') {
        setSelectedTeam(userInfoData.data.teams[0]);
        navigate(`/team/${userInfoData.data.teams[0].teamId}`);
      } else {
        // console.log(userInfoData.data.teams.find((t) => t.teamId === +teamId));
        setSelectedTeam(
          userInfoData.data.teams.find((t) => t.teamId === +teamId)!,
        );
      }
    }
  }, [userInfoData]);

  return (
    <Wrapper>
      <LeftSideBar />
      <AddTeamModal isOpen={addTeamModalOpen} />
      <AddCardModal isOpen={addCardModalOpen} />
      <AddDeckModal isOpen={addDeckModalOpen} />
      <AddMemberModal isOpen={addMemberModalOpen} />
      <DetailCardModal isOpen={detailCardModalOpen} />
      <TeamSettings isOpen={settomgModalOpen} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='decks' type="deck">
          {(provided) => (
            <Suspense fallback={<Loading />}>
              <DeckContainer ref={provided.innerRef} {...provided.droppableProps}>
                <Decks />
                {provided.placeholder}
              </DeckContainer>
            </Suspense>
          )}
        </Droppable>
      </DragDropContext>

      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
