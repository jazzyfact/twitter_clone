import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Signup = () => {
    return (
        <>
        <Head>
           <meta charSet="uft-8"></meta>
           <title>회원가입 | NodeBird</title>
       </Head>
       <AppLayout>회원가입</AppLayout>
       </>
    );
}
export default Signup;