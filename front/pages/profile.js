import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { Followings, Followers } = useSelector((state) => state.user.me);

  return (
    <>
      <Head>
        <title>profile :: next</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="FOLLOWING LIST" data={Followings} />
        <FollowList header="FOLLOWER LIST" data={Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
