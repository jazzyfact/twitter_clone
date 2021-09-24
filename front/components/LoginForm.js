import React,{useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link  from 'next/link';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import useInput from '../hooks/useInput';
import {loginRequestAction} from '../reducers/user';

// const ButtonWrapper = styled.div`
//   margin-top :10px;
// `;
// const FormWrapper = styled(Form)`
//   padding : 10px
// `;


// styled이 적용된, styled 태그를 불러옴
const ButtonWrapper = styled.div`
    margin-Top: 10px` ; 

const FormWrapper = styled.div`
    margin-Top: 10px` ; 

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
  

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password,
        }));
      }, [email, password]);
    

 
      return (
        <Form onFinish={onSubmitForm} style={{ padding: '10px' }}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
             {/* 컴포넌트에 props로 넘겨주는 것은 useCallback 써야함 */}
            <Input name="user-email"  type="email" value={email} onChange={onChangeEmail} required />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
          </div>
        </Form>
      );
    };




export default LoginForm;