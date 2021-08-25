import React ,{useCallback, useState} from 'react';
import Head from 'next/head';
import {Form, Input,Checkbox,Button } from 'antd';
import styled  from 'styled-components'

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div `
    color : red;
    `;

const Signup = () => {

    //hooks도 중복되면 중복 제거
    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('')
    const [password, onChangePassword] = useInput('')
    
    const [passwordCheck, setPasswordCheck] = useState('');
    //비밀번호 = 비밀번호 확인 false, != true
    const [passwordError, setPasswordError] = useState(false);
    
    //중복체크해줘야 해서 차이가 남
    const onChangePasswordCheck = useCallback((e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password);//패스워드 체크 여부 추가, 커스텀 훅으로 사용 할 수 없음
        },[password],
    )

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    
    //한번더 체크
    const onSubmit = useCallback(() => {
        if(password !== passwordCheck) {
            return setPasswordError(true);
        }

        if(!term) {
            return setTermError(true);
        }
        console.log(id,nickname,password);
    }, [password, passwordCheck,term]);

    
    return (
        <AppLayout>
        <Head>
           <meta charSet="uft-8"></meta>
           <title>회원가입 | NodeBird</title>
       </Head>
        <Form onFinish={onSubmit}>
            <div>
                <label htmlFor="user-id"> 아이디</label>
                <br/>
                <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br/>
                <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호체크</label>
                <br/>
                <Input 
                    name="user-password-check" 
                    type="pasword" 
                    value={passwordCheck} 
                    required 
                    onChange={onChangePasswordCheck} 
                    />
                    {/* 비밀번호 에러가 있으면 red 표시 */}
                    {passwordError && <ErrorMessage> 비밀전호가 일치하지 않습니다. </ErrorMessage>}
            </div>
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm} >이용 약관 동의합니다</Checkbox>
                {termError && <ErrorMessage>약관에 동의하셔야합니다. </ErrorMessage>}
            </div>
            <div style={{marginTop :10}}>
                <Button type ="primary" htmlType="submit"> 가입하기</Button>
            </div>
        </Form>
       </AppLayout>
    );
}
export default Signup;