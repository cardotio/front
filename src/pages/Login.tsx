import { API_URL } from 'api';
import { userTokenAtom } from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeLoginForm, TypeSignupForm } from 'types';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  min-height: 101vh;
`;
const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 450px;
  width: 50%;
  padding: 32px;
  margin-top: 61px;
`;
const LeftImage = styled.img`
  width: 100%;
`;
const Container = styled.div`
  max-width: 450px;
  width: 50%;
  padding: 0 32px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
const Input = styled.input`
  all: unset;
  margin: 0.5rem 0;
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
const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 10px 0;
  padding: 7px 0;
  background: #66757f;
  outline: 0;
  border: 0;
  border-radius: 3px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: 0.1s background-color;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  :hover {
    background-color: #525e66;
  }
`;
const Label = styled.label`
  color: ${(props) => props.theme.subTextColor};
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
`;
const ErrorMessageArea = styled.div`
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1rem;
  color: ${(props) => props.theme.errorTextColor};
`;

function Login() {
  const navigate = useNavigate();
  //   const [isFetching, setIsFetching] = useState(false);
  //   const [isAuthorized, setIsAuthorized] = useState(true);
  //   const isLogin = useRecoilValue(isLoginAtom);
  //   const setIsLogin = useSetRecoilState(isLoginAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeLoginForm>();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<TypeSignupForm>();
  const [isFetching, setIsFetching] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useRecoilState(userTokenAtom);

  useEffect(() => {
    if (token && token !== '') navigate('/team/me');
  }, [token]);

  const onLogin = (loginData: TypeLoginForm) => {
    console.log('LOGIN: /auth');
    setIsFetching(true);
    axios
      .post(API_URL + '/auth', { ...loginData })
      .then((response: AxiosResponse) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        // Unauthorized
        error.request.status === 401 && setIsAuth(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const onSignup = (signUpData: TypeSignupForm) => {
    console.log('SIGNUP: /users');
    setIsFetching(true);
    axios
      .post(API_URL + '/users', signUpData)
      .then((response: AxiosResponse) => {
        console.log(response);
        setShowLogin(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        error.response?.status == 409 && setAlreadyExist(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return (
    <Wrapper>
      <Container>
        {showLogin ? (
          <Form onSubmit={handleSubmit(onLogin)}>
            <Label>아이디</Label>
            <Input
              {...register('username', {
                required: 'This is Required',
              })}
              placeholder="아이디를 입력하세요"
            />
            <Label>비밀번호</Label>
            <Input
              {...register('password', {
                required: 'This is Required',
              })}
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
            <SubmitBtn type="submit">
              {isFetching ? (
                <Spinner radius={20} color={'#fff'} stroke={1} visible={true} />
              ) : (
                '로그인'
              )}
            </SubmitBtn>
            <Label style={{ margin: '5px 0 0 3px' }}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setShowLogin(false)}
              >
                가입하기
              </span>
            </Label>
            {errors.username ? (
              <ErrorMessageArea>아이디를 입력해 주세요.</ErrorMessageArea>
            ) : errors.password ? (
              <ErrorMessageArea>비밀번호를 입력해 주세요.</ErrorMessageArea>
            ) : (
              !isAuth && (
                <ErrorMessageArea>
                  아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.
                  입력하신 내용을 다시 확인해주세요.
                </ErrorMessageArea>
              )
            )}
          </Form>
        ) : (
          <Form onSubmit={handleSubmit2(onSignup)}>
            <Label>아이디</Label>
            <Input
              {...register2('username', {
                required: '아이디를 입력해주세요.',
                minLength: { value: 5, message: '아이디가 너무 짧습니다' },
                maxLength: { value: 20, message: '아이디가 너무 깁니다' },
                pattern: {
                  value: /^[A-Za-z0-9].{5,20}$/,
                  message:
                    '아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
                },
              })}
              placeholder="아이디를 입력하세요."
            />
            <Label>이름</Label>
            <Input
              {...register2('displayname', {
                required: '이름을 입력해주세요.',
                minLength: { value: 3, message: '이름을 너무 짧습니다' },
                maxLength: { value: 20, message: '이름을 너무 깁니다' },
              })}
              placeholder="이름을 입력하세요."
            />
            <Label>이메일</Label>
            <Input
              {...register2('email', {
                required: '이메일를 입력해주세요.',
                minLength: { value: 5, message: '이메일 너무 짧습니다' },
                maxLength: { value: 20, message: '이메일 너무 깁니다' },
                pattern: {
                  value: /^[A-Za-z0-9].{5,20}$/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
              placeholder="이메일을 입력하세요."
            />
            <Label>비밀번호</Label>
            <Input
              {...register2('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 8, message: '비밀번호가 너무 짧습니다' },
                maxLength: { value: 20, message: '비밀번호가 너무 깁니다' },
                pattern: {
                  value: /^[A-Za-z0-9].{8,20}$/,
                  message:
                    '비밀번호는 8~20자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
                },
              })}
              type="password"
              placeholder="비밀번호를 입력하세요."
            />

            <SubmitBtn>
              {isFetching ? (
                <Spinner radius={20} color={'#fff'} stroke={1} visible={true} />
              ) : (
                '가입하기'
              )}
            </SubmitBtn>
            <Label style={{ margin: '5px 0 0 3px' }}>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setShowLogin(true)}
              >
                로그인하기
              </span>
            </Label>
            {errors2.username ? (
              <ErrorMessageArea>{errors2.username.message}</ErrorMessageArea>
            ) : errors2.displayname ? (
              <ErrorMessageArea>{errors2.displayname.message}</ErrorMessageArea>
            ) : errors2.password ? (
              <ErrorMessageArea>{errors2.password.message}</ErrorMessageArea>
            ) : errors2.email ? (
              <ErrorMessageArea>{errors2.email.message}</ErrorMessageArea>
            ) : (
              alreadyExist && (
                <ErrorMessageArea>
                  이미 존재하는 아이디(로그인 전용 아이디)입니다. 다른 아이디를
                  입력해주세요.
                </ErrorMessageArea>
              )
            )}
          </Form>
        )}
      </Container>
    </Wrapper>
  );
}

export default React.memo(Login);
