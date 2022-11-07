import {
  teamMessagesAtom,
  selectedTeamAtom,
  selectedUserAtom,
  userInfoAtom,
  userTokenAtom,
} from 'atoms';
import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from 'api';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useForm } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TypeMessageInfo } from 'types';
import './style.css';
import {
  getOnlyDate,
  getOnlyTime,
  formatDateToKR,
  splitByDate,
  createDateTimeStamp,
} from 'helper/dateFormatter';

//import { Resizable } from 'react-resizable';
import './style.css';
import MyMessageBox from './messageBox/MyMessageBox';
import OpponentMessageBox from './messageBox/OpponentMessageBox';
import Member from './Member';
import { Resizable } from 're-resizable';
import SelectedUserInfo from './SelectedUserInfo';

var ws = Stomp.over(function () {
  return new SockJS(API_URL + '/chat');
});

function RightSideBar() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const token = useRecoilValue(userTokenAtom);
  const INDIVIDUAL = false;
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const [currentUser, setCurrentUser] = useRecoilState(userInfoAtom);

  const [teamMessages, setTeamMessages] = useRecoilState(teamMessagesAtom);
  const [selectedUserMessages, setSelectedUserMessages] = useState<
    TypeMessageInfo[]
  >([]);

  const [receiveState, setReceiveState] = useState(false);
  const [readState, setReadState] = useState(false);
  const scrollRef = useRef<null | HTMLDivElement>(null);

  function connect() {
    ws.connect(
      { Authorization: token },
      () => subscribeMessages(),
      (error: any) => console.log(error),
    );
  }

  function subscribeMessages() {
    // 상대방이 채팅을 보낼 때마다 받아오는 메세지
    ws.subscribe(
      '/sub/chat/users/' + currentUser?.username,
      (response: any) => {
        const message: TypeMessageInfo = JSON.parse(response.body);
        receiveMessage(message);
      },
    );
    // 상대방이 채팅을 읽을 때마다 받아오는 메세지
    ws.subscribe('/sub/chat/read/' + currentUser?.username, (response: any) => {
      setSelectedTeam((prev) => {
        setReadState((prev) => !prev);
        return prev;
      });
      
      
    });
  }

  // 좀 더 효율적으로 짤 수 있으면 좋을 듯
  function setMessagesUnreadToZero() {
    setSelectedUserMessages((prev) => {
      let temp: TypeMessageInfo[] = [];
      prev.map((message) => {
        if (message.sender == selectedUser?.username) {
          temp.push(createReadedMessage(message));
        } else {
          temp.push(message);
        }
      });
      return temp;
    });
    setTeamMessages((prev) => {
      let temp: TypeMessageInfo[] = [];
      prev.map((message) => {
        if (message.sender == selectedUser?.username && message.receiver == currentUser?.username) {
          temp.push(createReadedMessage(message));
        } else {
          temp.push(message);
        }
      });
      return temp;
    });
  }

  function createReadedMessage(message: TypeMessageInfo) {
    const resultMessage: TypeMessageInfo = {
      messageId: message.messageId,
      content: message.content,
      sender: message.sender,
      senderDisplayname: message.senderDisplayname,
      receiver: message.receiver,
      createdDate: message.createdDate,
      teamId: message.teamId,
      type: message.type,
      unread: 0,
      isTimestamp: message.isTimestamp,
    };
    return resultMessage;
  }

  function receiveMessage(message: TypeMessageInfo) {
    setTeamMessages((prev) => {
      const temp = [];
      prev.map((m) => temp.push(m));
      if (
        getOnlyDate(message.createdDate) !==
        getOnlyDate(prev[prev.length - 1].createdDate)
      )
        temp.push(createDateTimeStamp(message));
      temp.push(message);
      return temp;
    });
    setSelectedTeam((prev) => {
      if (prev?.teamId === message.teamId) setReceiveState((prev) => !prev);
      return prev;
    });
    setSelectedUserMessages((prev) => [...prev, message]);
  }

  function sendMessage(messageData: any, e: any) {
    if (messageData.message.length == 0) return;
    e.target[0].value = '';
    const messageObject = {
      content: messageData.message,
      receiver: selectedUser?.username,
      type: INDIVIDUAL,
      teamId: selectedTeam?.teamId,
    };

    ws.send(
      '/pub/message',
      { Authorization: token },
      JSON.stringify(messageObject),
    );
    readMessages();
  }

  function getTeamMessages() {
    console.log(`GET MESSAGES: /teams/${selectedTeam?.teamId}/messages`);
    axios
      .get(API_URL + '/teams/' + selectedTeam?.teamId + '/messages', {
        headers: { Authorization: `${token}` },
      })
      .then((response: AxiosResponse) => {
        setTeamMessages(splitByDate(response.data));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  function getPersonalMessages(
    teamMessages: TypeMessageInfo[],
    currentUsername: string,
    opponentUsername: string,
  ) {
    return teamMessages.filter(
      (
        message, //send receive 양방향
      ) =>
        (message.sender == currentUsername &&
          message.receiver == opponentUsername) ||
        (message.sender == opponentUsername &&
          message.receiver == currentUsername),
    );
  }

  function readMessages() {
    ws.send(
      '/pub/message/read',
      { Authorization: token },
      JSON.stringify({
        teamId: selectedTeam?.teamId,
        sender: currentUser?.username,
        receiver: selectedUser?.username,
      }),
    );
  }

  useEffect(() => {
    currentUser ? connect() : null;
  }, [currentUser]);

  useEffect(() => {
    if (!ws.connected || !selectedUser) return;
    readMessages();
    setMessagesUnreadToZero();
  }, [receiveState]);

  useEffect(() => {
    if(!selectedUserMessages || !ws.connected) return;
    readMessages();
  }, [selectedUserMessages])
  useEffect(() => {
    if (!ws.connected || !selectedUser) return;
    setSelectedUserMessages((prev) => {
        
      let temp: TypeMessageInfo[] = [];
      prev.map((message) => {
        if (message.sender == currentUser?.username) {
          temp.push(createReadedMessage(message));
        } else {
          temp.push(message);
        }
      });
      return temp;
    });
    setTeamMessages((prev) => {
      let temp: TypeMessageInfo[] = [];
      prev.map((message) => {
        if (message.sender == currentUser?.username && message.receiver == selectedUser?.username) {
          temp.push(createReadedMessage(message));
        } else {
          temp.push(message);
        }
      });
      console.log(temp);
      return temp;
    });
  }, [readState])
  useEffect(() => {
    if (!selectedUser) return;
    setMessagesUnreadToZero();
    readMessages();
  }, [selectedUser]);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;
    const filteredMessages = getPersonalMessages(
      teamMessages,
      currentUser.username,
      selectedUser.username,
    );
    setSelectedUserMessages(filteredMessages);

    if (!ws.connected) return;
  }, [currentUser, selectedUser]);

  useEffect(() => {
    setSelectedUser(null); // 팀 바뀔 때마다 선택된 유저 초기화
    selectedTeam && getTeamMessages();
  }, [selectedTeam]);

  useEffect(() => {
    if (!currentUser || !selectedUser) return;
    const filteredMessages = getPersonalMessages(
      teamMessages,
      currentUser.username,
      selectedUser.username,
    );
    setSelectedUserMessages(filteredMessages);
  }, [teamMessages]);

  useEffect(() => {
    scrollRef.current?.scroll({
      top: scrollRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [selectedUserMessages]);

  return (
    <Resizable
      className="right-bar"
      style={{ display: selectedUser ? 'flex' : 'none' }}
      defaultSize={{
        width: 300,
        height: '100%',
      }}
      minWidth={300}
      maxWidth={700}
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      handleClasses={{ left: 'resizer' }}
    >
      <div className="header">
        <button className="hide-btn" onClick={() => setSelectedUser(null)}>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span className="material-symbols-outlined double-arrow-right-icon">
            {' '}
            keyboard_double_arrow_right
          </span>
        </button>
        <SelectedUserInfo
          displayname={selectedUser?.displayname}
          role={selectedUser?.role}
          description={selectedUser?.description}
        />
      </div>

      <div className="messages" ref={scrollRef}>
        {selectedUserMessages?.map((message, i) =>
          message.isTimestamp ? (
            <div className="divided-date" key={i}>
              {formatDateToKR(message.createdDate)}
            </div>
          ) : (
            <div key={i}>
              {currentUser?.username == message?.sender ? (
                <MyMessageBox message={message} />
              ) : (
                <OpponentMessageBox message={message} />
              )}
            </div>
          ),
        )}
      </div>

      <form className="input-form" onSubmit={handleSubmit(sendMessage)}>
        <input placeholder="Write Something..." {...register('message')} />
        <button className="send-message-btn">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span className="material-symbols-outlined send-icon">send</span>
        </button>
      </form>
    </Resizable>
  );
}

export default React.memo(RightSideBar);
