import React, { useCallback, useEffect, useState } from 'react';
import {Card, Button, Avatar} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {logoutRequestAction} from '../reducers/user';
import useSWR from 'swr';
import axios from 'axios';
import Router from 'next/router';
import { backUrl } from '../config/config';

const fetcher = (url) =>axios.get(url, {withCredentials: true}).then((result) => result.data);
const UserProfile = () => {

    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();    
    const {me, logOutLoading} = useSelector((state) => (state.user));

    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);


    // fetcher : 백엔드 요청보낼떄 axios
    // data, error 둘다 없으면 로딩중    
    const { data: followersData, error: followerError}  = useSWR(`${backUrl}/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError} = useSWR(`${backUrl}/user/followings?limit=${followingsLimit}`, fetcher);
   
    const onLogout = useCallback(() => {
        // setIsLoggedIn(false);
        dispatch(logoutRequestAction());
    }, []);

    useEffect(()=> {
        if(!(me && me.id)){
            Router.push('/');
        }        
    }, [me && me.id]);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev)=> prev +3);
    }, [])

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev)=> prev +3);
    }, [])

    if(!me){
        return '내 정보 로딩중';
    }
    
    // return이 다른 hooks (useEffect)보다 위에있으면 error발생되므로, 
    // hooks가 다 실행된후, return문이 있어야한다.  
    if(followingError || followerError){
        console.error(followingError || followerError);
        return <div>팔로윙/팔로워 로딩 중 에러가 발생하였습니다.</div>;
    }

 

    return (
        <Card
            actions={[
                    <div key="twit">쨱짹<br />{me.Posts.length}</div>,
                    <div key="followings" >팔로잉<br />{followingsData}</div>,
                    <div key="followers">팔로워<br />{followersData}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname}</Avatar>}
                title={me.nickname}
                            />
            <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
        </Card>        
    );
}

export default UserProfile;