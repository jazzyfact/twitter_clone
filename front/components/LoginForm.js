import React,{useState, useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link  from 'next/link';


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
            <div>
                <Button type="primary" htmlType="submit" loding={false} required/>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    );
}

export default LoginForm;