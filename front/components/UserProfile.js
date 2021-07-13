import React, { useCallback } from 'react';
import Link from 'next/link';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
  const { Posts, Followings, Followers, nickname, id } = useSelector((state) => state.user.me);

  const dispatch = useDispatch();
  const { logoutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit"><Link href={`/user/${id}`}><a>트윗</a></Link><br /> {Posts.length}</div>,
        <div key="followings"><Link href="/profile"><a>팔로잉</a></Link><br /> {Followings.length}</div>,
        <div key="followers"><Link href="/profile"><a>팔로워</a></Link><br /> {Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={(
          <Link href={`/user/${id}`}>
            <a>
              <Avatar>{nickname[0]}</Avatar>
            </a>
          </Link>
        )}
        title={nickname}
      />
      <Button onClick={onLogout} loading={logoutLoading}>LOGOUT</Button>
    </Card>
  );
};

export default UserProfile;
