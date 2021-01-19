import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {Form, Button, Input}  from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import {loginRequestAction} from '../reducers/user';

const FormWrapper = styled(Form)`
padding: 10px;
` ; 

const LogginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading, logInError } = useSelector((state) => (state.user));

    const [email, onChangeEmail] = useInput('qudgus1447@gmail.com');
    const [password, onChangePassword] = useInput('1234');

    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    
    useEffect(()=> {
        if(logInError){
            alert(logInError);
        }
    }, [logInError])
    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        // setIsLoggedIn(true);
        dispatch(loginRequestAction({email, password}));        
    }, [email, password]);

    const ButtonWrapper = styled.div`
        margin-top: 10px;
    `;     
  
    const style =useMemo(() => ({marginTop: 10}), []);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name ="user-email" type="email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name ="user-password" type="password" value={password} onChange={onChangePassword} required />

            </div>
            <div>

            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>            
        </FormWrapper>        
    ) 
}

export default LogginForm;