import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useRef, useEffect } from "react";
import {Form, Input, Button } from 'antd';
import { addPost, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
    const {imagePaths, addPostDone} = useSelector((state) => state.post);
    const dispatch = useDispatch();
    
    const [text, onChangeText, setText] = useInput('');

    useEffect(()=> {
        if(addPostDone){
            setText('');
        }
    }, [addPostDone]);
 
    const onSubmit = useCallback(()=>{
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요');
        }

        // 이미지가 없는 경우 굳이 formData를 안써도됨
        // 1. multer.none써 보기 위해 formData로 보낼려고 만듬
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });
        formData.append('content', text);

        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,

            // 2. json형태로 보내도됨
            // data: {
            //     imagePaths,
            //     content: text,
            // }
        });
        // dispatch(addPost(text));
        // setText('');
    }, [text, imagePaths]);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(()=>{
        return imageInput.current.click();
    }, [imageInput.current]);    

    const onChangeImages = useCallback((e)=>{
        console.log('images', e.target.files);
        const imageFormData = new FormData(); // FormData: multipart형식으로 서버로 보낼수 있음
        
        // [].forEach.call(유사배열, (원소) => { ... } )        
        // 유사배열이라 .forEach()가 없음 >> call로 배열 형태로 만들어 주는 것같음
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f)// key: 'image', value: f >> router/post.js 의 upload.array('image')와 key가 일치해야한다. 
        })
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data : imageFormData
        })
    }, []);    

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        })
    });

    return (
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
            value={text}
            onChange={onChangeText}
            maxLength={140}
            placeholder='어떤 일이 있었나요?'
            />
            <div>                
                <input type="file" name='image' multiple hidden ref={imageInput} onChange={onChangeImages}/> {/* 2. onChange 이벤트 실행*/}                
                <Button onClick={onClickImageUpload}>이미지 업로드</Button> {/* 1. 이미지 업로드창에서 확인 */}
                <Button type="primary" style={{float: 'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v, i) => (
                    <div key={v} style={{display: 'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} style={{width: '200px'}} alt={v} />
                        <div>
                            <Button onClick={onRemoveImage(i)}>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>

    )
};

export default PostForm;