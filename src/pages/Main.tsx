import LeftSideBar from 'components/leftsidebar/LeftSideBar';
import RightSideBar from 'components/RightSideBar';
import React, { Suspense, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import axios from 'axios';
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
  deleteDeckModalOpenAtom,
} from 'atoms';
import AddTeamModal from 'components/modals/AddTeamModal';
import { getUserInfo } from 'api';
import AddCardModal from 'components/modals/AddCardModal';
import TeamSettings from 'components/leftsidebar/TeamSettings';
import AddMemberModal from 'components/modals/AddMemberModal';

import AddDeckModal from 'components/modals/AddDeckModal';
import DetailCardModal from 'components/modals/DetailCardModal';
import { useQuery } from 'react-query';
import Decks from 'components/deck/Decks';
import Loading from 'components/Loading';
import MaximizedCard from 'components/card/MaximizedCard';
import { AxiosError, AxiosResponse } from 'axios';

import { API_URL } from 'api';
import DeleteDeckModal from 'components/modals/DeleteDeckModal';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);

  const [addDeckModalOpen, setAddDeckModalOpen] =
    useRecoilState(addDeckModalOpenAtom);

  const [deleteDeckModalOpen, setDeleteDeckModalOpen] =
    useRecoilState(deleteDeckModalOpenAtom);
  const [addMemberModalOpen, setAddMemberModalOpen] = useRecoilState(
    addMemberModalOpenAtom,
  );
  const [detailCardModalOpen, setDetailCardModalOpen] = useRecoilState(
    detailCardModalOpenAtom,
  );
  const [addCardModalOpen, setAddCardModalOpen] =
    useRecoilState(addCardModalOpenAtom);
  const [settimgModalOpen, setSettimgModalOpen] =
    useRecoilState(settingModalOpenAtom);

  const [decks, setDecks] = useRecoilState(deckListAtom);

  const { teamid } = useParams();

  const { data: userInfoData } = useQuery(['user'], () => getUserInfo(token));

  
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    let decksCopy = [...decks];

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

    console.log(dstDeck?.deckId);
    const cardsCopy = Array.from(decksCopy[dstDeckIndex].cards);

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
    setDecks(decksCopy);

    axios
      .put(
        API_URL + `/teams/${teamid}/cards/decks`,
        {
          cardId: srcCard?.cardId,
          deckId: dstDeck?.deckId
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        
      })
      .catch((error: AxiosError) => {
        console.log(error);
        // // Unauthorized
        // error.request.status === 401 && setIsAuth(false);
      })
      .finally(() => {
      });
  };

  useEffect(() => {
    if (!token || token === '') navigate('/login');
  }, [token]);

  useEffect(() => {
    if (userInfoData) {
      setUserInfo(userInfoData.data);
      const temp = userInfoData.data.teams[0];
      if (teamid === 'me') {
        setSelectedTeam(userInfoData.data.teams[0]);
        navigate(`/team/${userInfoData.data.teams[0].teamId}`);
      } else {
        // console.log(userInfoData.data.teams.find((t) => t.teamId === +teamId));
        setSelectedTeam(
          userInfoData.data.teams.find((t) => t.teamId === +teamid!)!,
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
      <DeleteDeckModal isOpen={deleteDeckModalOpen} />
      <AddMemberModal isOpen={addMemberModalOpen} />
      <DetailCardModal isOpen={detailCardModalOpen} />
      <TeamSettings isOpen={settimgModalOpen} />
      {searchParams.get('card') ? (
        <MaximizedCard />
      ) : (
        <DragDropContext onDragEnd={onDragEnd} >
          <Suspense fallback={<Loading />}>
            <Decks />
          </Suspense>
        </DragDropContext>
      )}

      <RightSideBar />
    </Wrapper>
  );
}

export default React.memo(Main);
