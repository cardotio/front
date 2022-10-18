import { API_URL } from 'api';
import { userTokenAtom } from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { TypeLoginForm, TypeSignupForm } from 'types';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Logo_cardio } from '../images/logo_cardio.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 110px 10vw;
  min-height: 101vh;
  background: ${(props) => props.theme.bgColor};
`;
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  position: relative;
  background: ${(props) => props.theme.loginLeftContainer};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  svg {
    position: absolute;
    top: 40px;
    width: 150px;
  }

  span {
    position: absolute;
    bottom: 80px;
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    color: ${(props) => props.theme.textColor};
  }
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  padding: 0 32px;
  background: ${(props) => props.theme.loginRightContainer};
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  svg {
    width: 50px;
    height: 50px;
    margin-top: 100px;
  }
  span {
    margin-bottom: 50px;
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 31px;
    color: ${(props) => props.theme.textColor};
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  transition: all 200ms linear;
`;
const Input = styled.input`
  all: unset;
  padding: 8px 10px;
  margin-top: 8px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: ${(props) => props.theme.inputColor};
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.9rem;
  border: 1px solid black;
  outline: none;
  transition: all 200ms linear;
  &::placeholder {
    font-weight: 100;
    transition: all 200ms linear;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 7px 0;
  background: ${(props) => props.theme.loginBtnColor};
  outline: 0;
  border: 0;
  border-radius: 10px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: 0.1s background-color;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  :hover {
    background-color: ${(props) => props.theme.loginBtnHoverColor};
  }
`;
const Label = styled.label`
  color: ${(props) => props.theme.loginLabelColor};
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 600;

  a {
    color: blue;
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const ErrorMessageArea = styled.div`
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1rem;
  color: ${(props) => props.theme.errorTextColor};
`;

function Login() {
  const navigate = useNavigate();
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
  const [isAuth, setIsAuth] = useState(true);
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
        console.log(`USERINFO: /users/${loginData.username}`);
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
        <LeftContainer>
          <Logo_cardio />
          <span>
            Make you cards, <br /> Take our business
          </span>
        </LeftContainer>
        <RightContainer>
          <Logo />
          {showLogin ? (
            <>
              <span>Sign In</span>
              <Form onSubmit={handleSubmit(onLogin)}>
                <Label>Username</Label>
                <Input
                  {...register('username', {
                    required: 'This is Required',
                  })}
                  placeholder="Your Username"
                />
                <Label>Password</Label>
                <Input
                  {...register('password', {
                    required: 'This is Required',
                  })}
                  type="password"
                  placeholder="Your password"
                />
                <SubmitBtn type="submit">
                  {isFetching ? (
                    <Spinner
                      radius={20}
                      color={'#fff'}
                      stroke={1}
                      visible={true}
                    />
                  ) : (
                    '로그인'
                  )}
                </SubmitBtn>
                <Label
                  style={{
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  Don{"'"}t have an acount?{' '}
                  <a onClick={() => setShowLogin(false)}>Sign Up</a>
                </Label>
                {errors.username ? (
                  <ErrorMessageArea>Please enter username</ErrorMessageArea>
                ) : errors.password ? (
                  <ErrorMessageArea>Please enter password</ErrorMessageArea>
                ) : (
                  !isAuth && (
                    <ErrorMessageArea>
                      아이디(로그인 전용 아이디) 또는 비밀번호를 잘못
                      입력했습니다. 입력하신 내용을 다시 확인해주세요.
                    </ErrorMessageArea>
                  )
                )}
              </Form>
            </>
          ) : (
            <>
              <span>Sign Up</span>
              <Form onSubmit={handleSubmit2(onSignup)}>
                <Label>Username</Label>
                <Input
                  {...register2('username', {
                    required: '아이디를 입력해주세요.',
                    minLength: { value: 5, message: '아이디가 너무 짧습니다' },
                    maxLength: { value: 20, message: '아이디가 너무 깁니다' },
                    pattern: {
                      value: /^[A-Za-z0-9]*.{5,20}$/,
                      message:
                        '아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
                    },
                  })}
                  placeholder="Your Username"
                />
                <Label>Display Name</Label>
                <Input
                  {...register2('displayname', {
                    required: '이름을 입력해주세요.',
                    minLength: { value: 3, message: '이름을 너무 짧습니다' },
                    maxLength: { value: 20, message: '이름을 너무 깁니다' },
                  })}
                  placeholder="Your Display Name"
                />
                <Label>Email</Label>
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
                  placeholder="Your Email"
                />
                <Label>Password</Label>
                <Input
                  {...register2('password', {
                    required: '비밀번호를 입력해주세요.',
                    minLength: {
                      value: 8,
                      message: '비밀번호가 너무 짧습니다',
                    },
                    maxLength: { value: 20, message: '비밀번호가 너무 깁니다' },
                    pattern: {
                      value: /^[A-Za-z0-9].{8,20}$/,
                      message:
                        '비밀번호는 8~20자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
                    },
                  })}
                  type="password"
                  placeholder="Your password"
                />

                <SubmitBtn>
                  {isFetching ? (
                    <Spinner
                      radius={20}
                      color={'#fff'}
                      stroke={1}
                      visible={true}
                    />
                  ) : (
                    'Sign Up'
                  )}
                </SubmitBtn>
                <Label
                  style={{
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  Already have an acount?{' '}
                  <a onClick={() => setShowLogin(true)}>Sign In</a>
                </Label>
                {errors2.username ? (
                  <ErrorMessageArea>
                    {errors2.username.message}
                  </ErrorMessageArea>
                ) : errors2.displayname ? (
                  <ErrorMessageArea>
                    {errors2.displayname.message}
                  </ErrorMessageArea>
                ) : errors2.password ? (
                  <ErrorMessageArea>
                    {errors2.password.message}
                  </ErrorMessageArea>
                ) : errors2.email ? (
                  <ErrorMessageArea>{errors2.email.message}</ErrorMessageArea>
                ) : (
                  alreadyExist && (
                    <ErrorMessageArea>
                      이미 존재하는 아이디(로그인 전용 아이디)입니다. 다른
                      아이디를 입력해주세요.
                    </ErrorMessageArea>
                  )
                )}
              </Form>
            </>
          )}
        </RightContainer>
      </Container>
    </Wrapper>
  );
}

export default React.memo(Login);
