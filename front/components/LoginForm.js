import React,{useState, useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link  from 'next/link';
import styled from 'styled-components';



// styled이 적용된, styled 태그를 불러옴
const ButtonWrapper = styled.div`
    margin-Top: 10px` ;

const LoginForm = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
   

    const onChangeId = useCallback((e) => {

        setId(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {

        setPassword(e.target.value);
    }, []);

    return (
        <Form>
            <div>
                <label htmlFor ="user-id">아이디</label>
                <br/>
                {/* 컴포넌트에 props로 넘겨주는 것은 useCallback 써야함 */}
                <Input 
                name="user-id" 
                value={id} 
                onChange={onChangeId} 
                required />
            </div>
            <div>
            <label htmlFor ="user-password">비밀번호</label>
                <br/>
                <Input 
                name="user-password" 
                value={password} 
                onChange={onChangePassword} 
                required />
            </div>
            <ButtonWrapper >
                {/* style은 객체로 넣으면 안된다 */}
                <Button type="primary" htmlType="submit" loading={false}>로그인 </Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </Form>
    );
}

export default LoginForm;