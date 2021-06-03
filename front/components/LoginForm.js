import React, { useCallback, useState } from 'react';
import { Form, Button } from 'antd';
import Link from 'next/link';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setUserId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setUserPassword(e.target.value);
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <input name="user-id" value={userId} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <input
          type="password"
          name="user-password"
          value={userPassword}
          onChange={onChangePassword}
          required
        />
      </div>
      <div>
        <Button type="primary" htmlFor="submit" loading={false}>LOGIN</Button>
        <Link href="/signup"><a><Button>SIGNUP</Button></a></Link>
      </div>
    </Form>
  )
};

export default LoginForm;