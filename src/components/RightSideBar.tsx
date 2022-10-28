import { currentUsersAtom, messagesAtom, myTeamsAtom, selectedTeamAtom, selectedUserAtom, userInfoAtom, userTokenAtom } from 'atoms';
import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from 'api';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useForm } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TypeMessageInfo } from 'types';

import "./style.css";
const Wrapper = styled.aside`
	min-width: 340px;
	height: 100%;
	background: #ffffff;
`;


const Input = styled.input`
	width: 80%;
	margin: 10px auto;
`


var ws = Stomp.over(function () {
	return new SockJS(API_URL + "/chat");
});


function RightSideBar() {
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm();
	const token = useRecoilValue(userTokenAtom)
	const INDIVISUAL = false;
	const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);
	const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
	const [currentUser, setCurrentUser] = useRecoilState(userInfoAtom);
	const [myTeams, setMyTeams] = useRecoilState(myTeamsAtom);

	const [messages, setMessages] = useRecoilState(messagesAtom);
	const [currentMessages, setCurrentMessages] = useState<TypeMessageInfo[]>([]);
	const [tempDate, setTempDate] = useState("");

	const scrollRef = useRef<null | HTMLDivElement>(null);

	const connect = () => {
		ws.connect({ Authorization: token }, () => {
			ws.subscribe("/sub/chat/users/" + currentUser?.username, (message: any) => {
				var recv: TypeMessageInfo = JSON.parse(message.body);
				setMessages((prev) => [...prev, recv])
				setCurrentMessages((prev) => [...prev, recv])
			});
		}, function (error: any) {
			console.log(error);
		});
	}
	const disconnect = () => {

	}

	const sendMessage = (messageData: any, e: any) => {
		e.target[0].value = "";

		ws.send("/pub/message", { Authorization: token }, JSON.stringify({
			content: messageData.message,
			receiver: selectedUser?.username,
			type: INDIVISUAL,
			teamname: selectedTeam?.teamname
		}));
		
	}

	/** 팀이 가지고 있는 모든 메세지들을 가져옴 */
	function loadTeamMessages() {
		axios.get(API_URL + '/teams/' + selectedTeam?.teamname + '/messages', {
			headers: { Authorization: `${token}` },
		}).then((response: AxiosResponse) => {
			setMessages(response.data);
		}).catch((error: AxiosError) => {
			console.log(error);
		});
	}

	/**팀이 가지고 있는 메세지 중 현재 유저와 상대방 유저의 채팅을 filter해서 가져옴 */
	function loadMessages(currentUsername: string, opponentUsername: string) {
		//send receive 양방향 
		setCurrentMessages(messages.filter(message =>
			(message.sender == currentUsername && message.receiver == opponentUsername) ||
			(message.sender == opponentUsername && message.receiver == currentUsername)));
	}

	// 
	useEffect(() => {
		if (!currentUser || !selectedUser) return;
		loadMessages(currentUser.username, selectedUser.username);
	}, [currentUser, selectedUser])

	useEffect(() => {
		loadTeamMessages();
	}, [selectedTeam])

	useEffect(() => {
		currentUser ? connect() : null;
	}, [currentUser])

	useEffect(() => {
		scrollRef.current?.scroll({ top: scrollRef.current?.scrollHeight, behavior: 'smooth' })
	}, [currentMessages])
	return <Wrapper>
		<div>
			<div style={{ fontWeight: "1000", fontSize: "20px" }}>{selectedUser?.displayname}</div>
			<div>{selectedUser?.role}</div>
			<div>{selectedUser?.description}</div>
		</div>
		<div className='messages' ref={scrollRef}>
			{currentMessages?.map((message, i) =>
			(<div key={i} >
				{currentUser?.username == message?.sender ?
					<div className="message message-my">
						<div className="message-box message-box-my">
							<div>{message.content}</div>
							<div className='created-date'>{message.createdDate.replaceAll("T", " ")}</div>
						</div>
					</div>
					: <div className="message message-opponent">

						<div className="message-sender-name">{message.senderDisplayname}</div>
						<div className="message-box message-box-opponent">
							<div>{message.content}</div>
							<div className='created-date'>{message.createdDate.replaceAll("T", " ")}</div>
						</div>
					</div>
				}

			</div>)
			)
			}
		</div>


		<form onSubmit={handleSubmit(sendMessage)}>
			<Input {...register('message')} />
		</form>

	</Wrapper>;

}

export default React.memo(RightSideBar);
