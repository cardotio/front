import { API_URL } from 'api';
import { userTokenAtom } from 'atoms';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    resetField: resetFieldLogin,
  } = useForm<TypeLoginForm>();
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
    resetField: resetFieldSignup,
  } = useForm<TypeSignupForm>();
  const [isFetching, setIsFetching] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  /* Log in */
  const handleLogin = (loginData: TypeLoginForm) => {
    console.log('LOGIN: /auth');
    setIsFetching(true);
    setIsAuth(false);
    
    axios
      .post(API_URL + '/auth', { ...loginData })
      .then((response: AxiosResponse) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        error.response?.status == 401 &&
          setLoginErrorMessage(
            '?????????(????????? ??????) ?????? ??????????????? ???????????? ????????????. ?????? ?????? ?????????????????????.',
          );
        error.code === 'ERR_NETWORK' &&
          setLoginErrorMessage('???????????? ????????? ???????????? ????????? ??? ????????????.');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  /* Sign up */
  const handleSignup = (signUpData: TypeSignupForm, e: any) => {
    console.log('SIGNUP: /users');
    setIsFetching(true);
    setServerError(false);
    axios
      .post(API_URL + '/users', signUpData)
      .then((response: AxiosResponse) => {
        console.log(response);
        setShowLogin(true);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setServerError(true);
        error.response?.status === 409 &&
          setServerErrorMessage(
            ' ?????? ???????????? ?????????(????????? ?????? ?????????)?????????. ?????? ???????????? ??????????????????.',
          );
        error.code === 'ERR_NETWORK' &&
          setServerErrorMessage('???????????? ????????? ???????????? ????????? ??? ????????????.');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const toggle = () => {
    setShowLogin((prev) => !prev);
    resetFields();
  };

  const resetFields = () => {
    resetFieldLogin('username');
    resetFieldLogin('password');
    resetFieldSignup('username');
    resetFieldSignup('password');
    resetFieldSignup('displayname');
    resetFieldSignup('email');
    resetFieldSignup('role');
  };

  useEffect(() => {
    if (token && token !== '') {
      if (location.state === null) navigate('/team/me');
      else if (location.state.fromInvite) navigate(-1);
      else navigate('/team/me');
    }
  }, [token]);

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
              <Form key={1} onSubmit={handleSubmitLogin(handleLogin)}>
                <Label>Username</Label>
                <Input
                  {...registerLogin('username', {
                    required: 'This is Required',
                  })}
                  placeholder="Your Username"
                />
                <Label>Password</Label>
                <Input
                  {...registerLogin('password', {
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
                    '?????????'
                  )}
                </SubmitBtn>
                <Label
                  style={{
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  Don{"'"}t have an acount? <a onClick={toggle}>Sign Up</a>
                </Label>
                {errorsLogin.username ? (
                  <ErrorMessageArea>Please enter username</ErrorMessageArea>
                ) : errorsLogin.password ? (
                  <ErrorMessageArea>Please enter password</ErrorMessageArea>
                ) : (
                  !isAuth && (
                    <ErrorMessageArea>{loginErrorMessage}</ErrorMessageArea>
                  )
                )}
              </Form>
            </>
          ) : (
            <>
              <span>Sign Up</span>
              <Form key={2} onSubmit={handleSubmitSignup(handleSignup)}>
                <Label>Username</Label>
                <Input
                  {...registerSignup('username', {
                    required: '???????????? ??????????????????.',
                    minLength: { value: 5, message: '???????????? ?????? ????????????' },
                    maxLength: { value: 20, message: '???????????? ?????? ?????????' },
                    pattern: {
                      value: /^[A-Za-z0-9]*.{5,20}$/,
                      message:
                        '???????????? 5~20?????? ?????? ?????????, ????????? ?????? ???????????????.',
                    },
                  })}
                  placeholder="Your Username"
                />
                <Label>Password</Label>
                <Input
                  {...registerSignup('password', {
                    required: '??????????????? ??????????????????.',
                    minLength: {
                      value: 8,
                      message: '??????????????? ?????? ????????????',
                    },
                    maxLength: { value: 20, message: '??????????????? ?????? ?????????' },
                    pattern: {
                      value: /^[A-Za-z0-9].{8,20}$/,
                      message:
                        '??????????????? 8~20??? ?????? ??? ?????????, ??????, ??????????????? ???????????????.',
                    },
                  })}
                  type="password"
                  placeholder="Your password"
                />
                <Label>Display Name</Label>
                <Input
                  {...registerSignup('displayname', {
                    required: '????????? ??????????????????.',
                    minLength: { value: 3, message: '????????? ?????? ????????????' },
                    maxLength: { value: 20, message: '????????? ?????? ?????????' },
                  })}
                  placeholder="Your Display Name"
                />
                <Label>Email</Label>
                <Input
                  {...registerSignup('email', {
                    required: '???????????? ??????????????????.',
                    minLength: { value: 5, message: '???????????? ?????? ????????????' },
                    maxLength: { value: 20, message: '???????????? ?????? ?????????' },
                    pattern: {
                      value: /^[A-Za-z0-9].{5,20}$/,
                      message: '????????? ????????? ?????? ????????????.',
                    },
                  })}
                  placeholder="Your Email"
                />
                <Label>Role</Label>
                <Input
                  {...registerSignup('role', {
                    required: '????????? ??????????????????.',
                    minLength: { value: 1, message: '????????? ?????? ????????????' },
                    maxLength: { value: 20, message: '????????? ?????? ?????????' },
                  })}
                  placeholder="Your Role"
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
                  Already have an acount? <a onClick={toggle}>Sign In</a>
                </Label>
                {errorsSignup.username ? (
                  <ErrorMessageArea>
                    {errorsSignup.username.message}
                  </ErrorMessageArea>
                ) : errorsSignup.displayname ? (
                  <ErrorMessageArea>
                    {errorsSignup.displayname.message}
                  </ErrorMessageArea>
                ) : errorsSignup.password ? (
                  <ErrorMessageArea>
                    {errorsSignup.password.message}
                  </ErrorMessageArea>
                ) : errorsSignup.email ? (
                  <ErrorMessageArea>
                    {errorsSignup.email.message}
                  </ErrorMessageArea>
                ) : errorsSignup.role ? (
                  <ErrorMessageArea>
                    {errorsSignup.role.message}
                  </ErrorMessageArea>
                ) : (
                  serverError && (
                    <ErrorMessageArea>{serverErrorMessage}</ErrorMessageArea>
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
