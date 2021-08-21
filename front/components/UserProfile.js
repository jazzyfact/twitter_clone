import React from 'react';
import {Card, Avatar, Button} from 'antd';





const UserProfile = () => {
    return (
        <Card
            actions={[
                // react에서 배열 쓰려면 key 써야함
                <div key ="twit"> 짹짹 <br/>0</div>,
                <div key ="followings"> 팔로잉 <br/>0</div>,
                <div key ="followings"> 팔로워 <br/>0</div>,
            ]}
            >


            <Card.Meta
            avatar={<Avatar>HM</Avatar>}
            title="hyemi"
            />
            <Button>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;