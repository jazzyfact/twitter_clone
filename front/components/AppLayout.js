import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';


import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
// import Login from './Login';
import useInput from '../hooks/useInput';



const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const header =styled.div`
  font-size : 30sp;
`


const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>이가네 농장일기</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
       
        <Menu.Item>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item>
          {/* {me ?  '' :  <Link href="/login"><a>로그인</a></Link>} */}
        </Menu.Item>
      </Menu>
      {/* <header>
        주말농장
        </header>
       <NavBar/> */}
     
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {/* {me ? <UserProfile /> : <LoginForm />} */}
          {/* {me ? <UserProfile /> : <Login />} */}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
        {me ? <UserProfile /> : <LoginForm />}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;