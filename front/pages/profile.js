import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';


const Profile = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

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
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

//로그인한 사용자에 따라서 다른 것을 보여줌
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  console.log('getServerSideProps start');
  const cookie = req ? req.headers.cookie : '';//쿠키정보
  axios.defaults.headers.Cookie = ''; //쿠키비우기
  if (req && cookie) { //쿠키전달
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Profile;
