import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`

const LoginForm = ({ setIsLoggedIn }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setUserId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setUserPassword(e.target.value);
  }, []);

  const onLogin = useCallback(() => {
    console.log(userId, userPassword);
    setIsLoggedIn(true);
  }, [userId, userPassword]);

  return (
    <Form onFinish={onLogin}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={userId} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <Input
          type="password"
          name="user-password"
          value={userPassword}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>LOGIN</Button>
        <Link href="/signup"><a><Button>SIGNUP</Button></a></Link>
      </ButtonWrapper>
    </Form>
  )
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
}

export default LoginForm;