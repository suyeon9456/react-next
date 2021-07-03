import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const { Posts, Followings, Followers, nickname } = useSelector((state) => state.user.me);
  console.log(Posts);

  const dispatch = useDispatch();
  const { logoutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">트윗<br /> {Posts.length}</div>,
        <div key="followings">팔로잉<br /> {Followings.length}</div>,
        <div key="followers">팔로워<br /> {Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{nickname[0]}</Avatar>}
        title={nickname}
      />
      <Button onClick={onLogout} loading={logoutLoading}>LOGOUT</Button>
    </Card>
  );
};

export default UserProfile;
