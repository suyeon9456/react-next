import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import Router from 'next/router';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError, me } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(password !== e.target.value);
  }, [password]);

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(!e.target.checked);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, nickname, term]);

  return (
    <AppLayout>
      <Head>
        <title>signup :: next</title>
      </Head>
      <Form onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-email">EMAIL</label>
          <br />
          <Input type="email" name="user-email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nickname">NICKNAME</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">PASSWORD</label>
          <br />
          <Input type="password" name="user-password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">PASSWORD CHECK</label>
          <br />
          <Input type="password" name="user-password-check" value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>개인정보 동의</Checkbox>
          {termError && <ErrorMessage>개인정보 동의 체크해주세요.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signupLoading}>가입하기</Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
