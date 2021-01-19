import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLatout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';


import wrapper from '../store/configureStore';


const Home = () => {
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // me로 대체    
    const { me } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state => state.post))
    
    useEffect(()=> {
        // 서버사이드 렌더링으로 아래로 이동
        // dispatch({
        //     type: LOAD_MY_INFO_REQUEST
        // });
        // dispatch({
        //     type: LOAD_POSTS_REQUEST
        // });
    }, [])
    
    return (
        <AppLatout>
            {me && <PostForm />}
            {/* index를 key로 쓰면 안된다. */}
            {mainPosts.map((post, index) => <PostCard key={post.id} post={post}/>) }
        </AppLatout>
        
    );
}

// 윗부분은 브라우져, 프론트 서버 둘다에서 실행
// 프론트 서버에서만 실행
// 프론트, 백엔드 도메인이 달라 쿠키전달 안됨
// 크리덴셜 true 해줘야되는데 (백엔드), 보내는 쪽문제 확인 필요
// 프론트에서 백엔드로 보낼때, 쿠키는 자동으로 보내 주지않는다.
// axios에서 넣어서 보내줘야함
export const getServerSideProps = wrapper.getServerSideProps( async (context) => {// context안에 store가 들어있음
    //getServerSideProps 가 실행되고 나서, 실행된 결과를 reducer/index.js 에 HYDRATE에서 받는다.
    console.log(context);

    // 프론트 서버쪽에서 실행되면 (새로고침) context.req가 존재함
    // 백엔드 서버쪽에 쿠키가 전달    
    const cookie = context.req ? context.req.headers.cookie : '';  
    // axios.defaults.headers.Cookie = cookie;  // 쿠키가 공유되는 문제가 발생 할 수 있음
    axios.defaults.headers.Cookie = '';         // 쿠키 공유 문제 해결
    if(context.req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    // 1. 로그인 후 새로고침
    // 2. 백엔드 쿠키를 지우고
    // 3. 프론트 새로고침 && 프론트 쿠키 있냐?
    // 3-1. 프론트 쿠키 있냐 >> 로그인 되어있냐?

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST // 1.현재 REQUEST되고 나서 SUCCESS가 되기전 데이터가 완성되기 전에 리턴된다.
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST
    });

    // 2. SUCCESS가 된 후 완성된 데이터 리턴
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise(); // configureStore.js 의 store.sagaTask
})
export default Home;