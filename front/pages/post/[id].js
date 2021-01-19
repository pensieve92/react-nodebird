// post/[id].js
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper from '../../store/configureStore';

import { LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';


const Post = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <div>{id} 번째 게시글입니다.</div>
    )
};


export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
    console.log(context);    
    const cookie = context.req ? context.req.headers.cookie : '';      
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }    

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        // context.params.id, context.query.id 
        // const {id} = router.query; 와 동일하게 접근가능
        data: context.params.id,         
    });
    

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
})

export default Post;