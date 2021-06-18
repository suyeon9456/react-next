import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
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
