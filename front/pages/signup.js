import React, { useState } from 'react';
import Head from 'next/head';
import { Form, Checkbox, Button } from 'antd';
import Link from 'next/link'
import useInput from '../hooks/useInput';

const Signup = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');

  return (
    <>
      <Head>
        <title>signup :: next</title>
      </Head>
      <Form>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <input name="user-id" value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nickname">NICKNAME</label>
          <br />
          <input name="user-nickname" value={nickname} onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">PASSWORD</label>
          <br />
          <input name="user-password" value={password} onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">PASSWORD CHECK</label>
          <br />
          <input name="user-password-check" value={passwordCheck} />
        </div>
        <div>
          <Checkbox>개인정보 동의</Checkbox>
        </div>
        <div>
          <Button type="primary">가입하기</Button>
          <Link href="/"><a><Button>HOME</Button></a></Link>
        </div>
      </Form>
    </>
  )
};

export default Signup;
