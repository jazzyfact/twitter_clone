import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Profile = () => {
    return (
        <>
         <Head>
            <meta charSet="uft-8"></meta>
            <title>내 프로필 | NodeBird</title>
        </Head>
        <AppLayout>
            <NicknameEditForm/>
            <FollowList header="팔로잉 목록" data={followingList}/>
            <FolloList header="팔로워 목록" data={followerList}/>
        </AppLayout>
        </>
    );
}
export default Profile;