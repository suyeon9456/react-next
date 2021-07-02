import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
  }, []);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>profile :: next</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="FOLLOWING LIST" data={me.Followings} />
        <FollowList header="FOLLOWER LIST" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
