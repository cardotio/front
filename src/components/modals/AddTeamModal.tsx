import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'styled-react-modal';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  addTeamModalOpenAtom,
  userInfoAtom,
  userTokenAtom,
  selectedTeamAtom,
} from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from 'api';
import Spinner from 'react-spinner-material';
import { useNavigate } from 'react-router-dom';
import { TypeTeam } from 'types';

const Container = styled.div`
  width: 450px;
  padding: 20px 32px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);
`;
const Header = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Noto Sans KR';
  margin-left: 3px;
`;
const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  width: 100%;
  margin-right: 20px;
`;
const Input = styled.input`
  all: unset;
  width: 100%;
  margin-right: 20px;
  padding: 8px 10px;
  margin-bottom: 0.5rem;
  border-radius: 3px;
  box-shadow: rgb(15 15 15 / 20%) 0px 0px 0px 1px inset;
  background: ${(props) => props.theme.inputColor};
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.9rem;
  border: none;
  outline: none;
  &::placeholder {
    font-weight: 100;
  }
`;
const Btn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  min-width: 70px;
  height: 37px;
  padding: 7px 0;
  background: #66757f;
  outline: 0;
  border: 0;
  border-radius: 3px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: white;
  cursor: pointer;
  transition: 0.1s background-color;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  :hover {
    background-color: #525e66;
  }
  a {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 15px;
    font-weight: 300;
  }
`;
const ErrorMessageArea = styled.div`
  margin-top: 0.5rem;
  color: ${(props) => props.theme.errorTextColor};
  font-size: 0.75rem;
  line-height: 1rem;
`;

interface IModal {
  isOpen: boolean;
}

function AddTeamModal({ isOpen }: IModal) {
  const navigate = useNavigate();
  const [addTeamModalOpen, setAddTeamModalOpen] =
    useRecoilState(addTeamModalOpenAtom);
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedTeam, setSelectedTeam] = useRecoilState(selectedTeamAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ teamname }: any) => {
    console.log('ADD TEAM: /teams');
    setIsFetching(true);
    axios
      .post(
        API_URL + '/teams',
        { teamname },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        userInfo &&
          setUserInfo((prev) => {
            if (!prev) return prev;

            let teamsCopy: TypeTeam[] = [
              ...prev.teams,
              {
                teamId: response.data.teamId,
                teamname,
                teamCode: response.data.teamCode,
                users: [
                  {
                    displayname: userInfo!.displayname,
                    email: userInfo!.email,
                    role: userInfo!.role,
                    username: userInfo?.username,
                  },
                ],
              },
            ];
            prev = { ...prev, teams: teamsCopy };

            return prev;
          });
        setSelectedTeam({
          teamId: response.data.teamId,
          teamname,
          teamCode: response.data.teamCode,
          users: [
            {
              displayname: userInfo!.displayname,
              email: userInfo!.email,
              role: userInfo!.role,
              username: userInfo!.username,
            },
          ],
        });
        navigate(`/team/${response.data.teamId}`);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        // // Unauthorized
        // error.request.status === 401 && setIsAuth(false);
      })
      .finally(() => {
        setIsFetching(false);
        setAddTeamModalOpen(false);
      });
  };

  const handleClose = () => {
    setAddTeamModalOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={handleClose}
      onEscapeKeydown={handleClose}
    >
      <Container>
        <Header>Create New Team</Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter Team Name"
            {...register('teamname', {
              required: true,
              maxLength: 20,
              minLength: 5,
            })}
          />
          <Btn type="submit">
            {isFetching ? (
              <Spinner radius={20} color={'#fff'} stroke={1} visible={true} />
            ) : (
              'Create'
            )}
          </Btn>
        </Form>
        {errors.teamname && (
          <ErrorMessageArea>채팅방 이름은 5 ~ 20자 입니다.</ErrorMessageArea>
        )}
      </Container>
    </Modal>
  );
}

export default React.memo(AddTeamModal);
