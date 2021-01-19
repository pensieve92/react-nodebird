import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Button, Popover, List, Comment } from 'antd';
import {RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import PostImages from '../components/PostImages';
import CommentForm from './CommentForm';
import PostCardContent from '../components/PostCardContent';
import { UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';

moment.locale('ko'); 

const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [commentFormOpend, setCommentFormOpened] = useState(true);

    // const {me} = useSelector((state) => state.user);
    // const id = me && me.id;
    // const id = me?.id;    
    const id = useSelector((state) => state.user.me?.id);
    console.log(post);
    console.log(post.Images);

    const onUnLike = useCallback(()=> {
        if(!id) {
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type: LIKE_POST_REQUEST, 
            data: post.id
        })
    },[]);

    const onLike = useCallback(()=> {
        if(!id) {
            return alert('로그인이 필요합니다.');
        }
        dispatch({
                type: UNLIKE_POST_REQUEST, 
                data: post.id
        })        
    },[]);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    },[])       

    const onRetweet = useCallback(()=> {
        if(!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch ({
            type: RETWEET_REQUEST,
            data: post.id
        })
    }, [id])
 
    return (
        <div style={{marginBottom: 10}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet}/>,
                    liked 
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike}/>
                        : <HeartOutlined key="heart" onClick={onLike}/>
                    ,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type ="danger">삭제</Button>
                                </>
                            ) 
                            : <Button>신고</Button>}                            
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <div style={{float: 'right'}}>{moment(post.createAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />              
            </Card>
            {commentFormOpend && (
                <div>
                    <CommentForm post={post}/>
                    <List 
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
                                />
                                
                            </li>
                        )}
                    />

                </div>
            )}
            {/* <CommentForm /> */}
            {/* <Comments /> */}
        </div>
    )
}

// PostCard.propTypes={
//     post: PropTypes.shape({
//         id: PropTypes.string,
//         User:PropTypes.object,
//         content: PropTypes.string,
//         createAt:PropTypes.object,
//         Comments:PropTypes.arrayOf(PropTypes.object),
//         Images:PropTypes.arrayOf(PropTypes.object)
//     }).isRequired,
// }

export default PostCard;