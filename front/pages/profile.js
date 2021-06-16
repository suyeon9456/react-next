import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followingList = [{ nickname: 'suyeon' }, { nickname: 'jaewook' }, { nickname: 'yogi' }];
  const follwerList = [{ nickname: 'suyeon' }, { nickname: 'jaewook' }, { nickname: 'yogi' }];
  return (
    <>
      <Head>
        <title>profile :: next</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="FOLLOWING LIST" data={followingList} />
        <FollowList header="FOLLOWER LIST" data={follwerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
