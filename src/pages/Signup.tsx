import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TypeSignupForm } from 'types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  padding: 100px 0;
  min-height: 101vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
const Input = styled.input`
  width: 100%;
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
`;
const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin: 10px;
`;
const Radio = styled.input``;
const GenderLabel = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 0.9rem;
  margin-right: 10px;
  margin-left: 5px;
`;
const Label = styled.label`
  color: ${(props) => props.theme.subTextColor};
  font-size: 12px;
  font-family: 'Noto Sans KR', sans-serif;
`;
const SignUpBtn = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin: 10px 0;
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
`;
const ErrorMessageArea = styled.div`
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1rem;
  color: ${(props) => props.theme.errorTextColor};
`;

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeSignupForm>();
  const [alreadyExist, setAlreadyExist] = useState(false);

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Label>Username</Label>
        <Input
          {...register('username', {
            required: '아이디를 입력해주세요.',
            minLength: { value: 5, message: '아이디가 너무 짧습니다' },
            maxLength: { value: 20, message: '아이디가 너무 깁니다' },
            pattern: {
              value: /^[A-Za-z0-9].{5,20}$/,
              message: '아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
            },
          })}
          placeholder="아이디를 입력하세요."
        />
        <Label>Display Name</Label>
        <Input
          {...register('displayname', {
            required: '이름을 입력해주세요.',
            minLength: { value: 5, message: '이름을 너무 짧습니다' },
            maxLength: { value: 20, message: '이름을 너무 깁니다' },
          })}
          placeholder="아이디를 입력하세요."
        />
        <Label>Password</Label>
        <Input
          {...register('password', {
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

        <SignUpBtn>가입하기</SignUpBtn>
        {errors.username ? (
          <ErrorMessageArea>{errors.username.message}</ErrorMessageArea>
        ) : errors.displayname ? (
          <ErrorMessageArea>{errors.displayname.message}</ErrorMessageArea>
        ) : errors.password ? (
          <ErrorMessageArea>{errors.password.message}</ErrorMessageArea>
        ) : errors.email ? (
          <ErrorMessageArea>{errors.email.message}</ErrorMessageArea>
        ) : alreadyExist ? (
          <ErrorMessageArea>
            이미 존재하는 아이디(로그인 전용 아이디)입니다. 다른 아이디를
            입력해주세요.
          </ErrorMessageArea>
        ) : null}
      </Form>
    </Wrapper>
  );
}

export default React.memo(Join);
