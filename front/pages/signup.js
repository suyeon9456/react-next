import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
// import Link from 'next/link';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(password !== e.target.value);
  }, [password]);

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    console.log(e.target.checked)
    setTerm(e.target.checked);
    setTermError(!e.target.checked);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log(password, passwordCheck);
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, password, nickname);
  }, [id, password, nickname, term]);

  return (
    <AppLayout>
      <Head>
        <title>signup :: next</title>
      </Head>
      <Form onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nickname">NICKNAME</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">PASSWORD</label>
          <br />
          <Input name="user-password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">PASSWORD CHECK</label>
          <br />
          <Input name="user-password-check" value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>개인정보 동의</Checkbox>
          {termError && <ErrorMessage>개인정보 동의 체크해주세요.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">가입하기</Button>
        </div>
      </Form>
    </AppLayout>
  )
};

export default Signup;
