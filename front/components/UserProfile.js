import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const isLoggingOut = useSelector((state) => state.user.isLoggingOut);

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">트윗</div>,
        <div key="followings">팔로잉</div>,
        <div key="followers">팔로워</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>sy</Avatar>}
        title="suyeon"
      />
      <Button onClick={onLogout} loading={isLoggingOut}>LOGOUT</Button>
    </Card>
  )
};

export default UserProfile;
