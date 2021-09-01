import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Col, Input, Menu, Row } from 'antd';


import { useSelector } from 'react-redux';

import UserProfile from '../components/UserProfile';
import LoginForm  from '../components/LoginForm';


import styled from 'styled-components';



const SearchInput = styled(Input.Search)`
    verticalAlign: 'middle';
`;


const AppLayout = ({children}) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
    <div>
        <Menu mode ="horizontal">
            <Menu.Item>
                <Link href="/"><a>노드버드</a></Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/profile"><a>프로필</a></Link>
            </Menu.Item>
            <Menu.Item>
                <SearchInput enterButton/>
            </Menu.Item>
            <Menu.Item>
      <Link href="/signup"><a>회원가입</a></Link>
            </Menu.Item>
      </Menu>
      {/* 컬럼 사이에 간격 */}
      <Row gutter={8}>
          {/* 24칸중에 6칸 차지 25% */}
        <Col  xs= {24} md={6}>
            {/* 로그인 되어 있으면 사용자 프로필보여주고, 로그인 안되어있으면 로그인 폼을 보여줌 */}
            {isLoggedIn? <UserProfile />: <LoginForm />}
        </Col> 
        {/* 50% */}
        <Col  xs= {24} md={12}>
        {children}
        </Col>
          {/* 24칸중에 6칸 차지 25% */}
        <Col  xs= {24} md={6}>
            
            <a href="https://www.zerocho.com" target="_blank" rel="noreferrer noopener">hyemi</a>
        </Col>
        
      </Row>
    </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
  }
  
export default AppLayout;