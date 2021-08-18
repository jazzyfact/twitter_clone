import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row } from 'antd';

const AppLayout = ({children}) => {
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
                <Input.Search enterButton style={{verticalAlign: 'middle'}}/>
            </Menu.Item>
            <Menu.Item>
      <Link href="/signup"><a>회원가입</a></Link>
            </Menu.Item>
      </Menu>
      {/* 컬럼 사이에 간격 */}
      <Row gutter={8}>
          {/* 24칸중에 6칸 차지 25% */}
        <Col  xs= {24} md={6}>
            왼쪽 메뉴
        </Col> 
        {/* 50% */}
        <Col  xs= {24} md={12}>
        {children}
        </Col>
          {/* 24칸중에 6칸 차지 25% */}
        <Col  xs= {24} md={6}>
            오른쪽 메뉴
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