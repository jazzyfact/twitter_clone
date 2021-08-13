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
        <AppLayout>내 프로필</AppLayout>
        </>
    );
}
export default Profile;