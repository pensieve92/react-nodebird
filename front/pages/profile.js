import React, { useEffect } from 'react';
import AppLatout from '../components/AppLayout';
import Head from 'next/head';
import NickNameEditForm from '../components/NickNameEditForm';
import FollowerList from '../components/FollowList';
import { Router } from 'next/router';
import { useSelector } from 'react-redux';

const Profile = () => {

    const {me} = useSelector((state) => (state.user));
    // const followerList = [{nickname: '전뱅'}, {nickname:'전방'}, {nickname:'JB'}];
    // const followingList = [{nickname: 'JB'}, {nickname:'JeonBH'}, {nickname:'JeonBang'}];

    useEffect(() => {
        if(!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);

    if(!me){
        return null;
    }

    return(
        <>
    
    <Head>
        <title>내 프로필</title>
    </Head>
     <AppLatout>
         <NickNameEditForm />
         <FollowerList header ="팔로윙 목록" data={me.Followings}/>
         <FollowerList header ="팔로워 목록" data={me.Followers}/>
     </AppLatout>
        </>
     )
}

export default Profile;