import React, { useCallback } from 'react';
// import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.user);
  const [userEmail, onChangeEmail] = useInput('');
  const [userPassword, onChangePassword] = useInput('');

  const onLogin = useCallback(() => {
    dispatch(loginAction({ email: userEmail, password: userPassword }));
  }, [userEmail, userPassword]);

  return (
    <Form onFinish={onLogin}>
      <div>
        <label htmlFor="user-email">ID</label>
        <br />
        <Input type="email" name="user-email" value={userEmail} onChange={onChangeEmail} required />
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
        <Button type="primary" htmlType="submit" loading={loginLoading}>LOGIN</Button>
        <Link href="/signup"><a><Button>SIGNUP</Button></a></Link>
      </ButtonWrapper>
    </Form>
  );
};

// LoginForm.propTypes = {
//   setIsLoggedIn: PropTypes.func.isRequired
// }

export default LoginForm;
