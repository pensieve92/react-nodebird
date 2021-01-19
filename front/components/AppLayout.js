import React, {useState} from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import {Menu, Input, Row, Col} from 'antd';
import { useSelector } from 'react-redux';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LogginForm';

const AppLayout = ({children}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);    
    
    // reducer/index.js >> 흩어저있는 데이터를 넘겨주지 않아도된다.
    const {me} = useSelector((state) => state.user);
    // const {isLoggedIn} = useSelector((state) => state.user); // 비구조 할당

    return (
        <div>
            <Menu mode="horizontal">
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
            <Row gutter={8}>
                <Col xs={24} md={6} >
                    {me ? <UserProfile/>: <LoginForm/>}
                </Col>
                <Col xs={24} md={12} >
                {children}
                </Col>                
                <Col xs={24} md={6} >                                    
                    <a href="https://www.zerocho.com"
                        target="_blank"
                        rel="noreferrer noopener">Made by ZeroCho</a> 
                </Col>
            </Row>
            
        </div>
    )
}

AppLayout.propTypes = {
    children: propTypes.node.isRequired,
};

export default AppLayout;

