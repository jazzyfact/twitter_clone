import React,{useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link  from 'next/link';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';

import useInput from '../hooks/useInput';
import {loginAction} from '../reudcers';



// styled이 적용된, styled 태그를 불러옴
const ButtonWrapper = styled.div`
    margin-Top: 10px` ; 

const FormWrapper = styled.div`
    margin-Top: 10px` ; 

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();

    const onSubmitForm = useCallback(() => {
        dispatch(loginAction({
          id,
          password,
        }));
      }, [id, password]);
    

 
      return (
        <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
             {/* 컴포넌트에 props로 넘겨주는 것은 useCallback 써야함 */}
            <Input name="user-id" value={id} onChange={onChangeId} required />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
          </div>
        </Form>
      );
    };




export default LoginForm;