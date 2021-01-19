import React, {useMemo} from 'react';
import {Form, Input, List, Card, Button} from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const FollowList = ({header, data}) => {
    const style= useMemo(()=> ({marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}));
    const dispatch = useDispatch();
    // 고차함수
    // 반복문 안에서 onClick
    // 반복문에 대한 데이터를 고차함수로 넘겨준다.
    // item.id를 id로 넘어온다.
    const oncancel = (id) => ()=> {
        if(header === '팔로잉'){
            // dispatch({
            //     type: UNFOLLOW_REQUEST, // action 안만듬..
            //     data: id
            // })
        }

        dispatch({
            type: REMOVE_FOLLOWER_REQUEST, // action 안만듬..
            data: id
        })
        
    }
    return (
        <List 
            style={{marginBottom: 20}}
            grid={{gutter:4, xs:2, md:3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{textAlign: 'center', margin: "10px 0"}}><Button>더 보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{marginTop: 20}}>
                    <Card actions={[<StopOutlined key="stop" onClick={oncancel(item.id)} />]}>
                        <Card.Meta description={item.nickname} />                    
                    </Card>
                </List.Item>
            )}
        />        
    )
}

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data:PropTypes.array.isRequired,
}

export default FollowList;
