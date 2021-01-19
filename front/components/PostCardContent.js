import React from 'react';
import Link from 'next/link';


const PostCardContent = ({postData}) => { //첫번째 게시글 #해시태그 #익스프레스    
    console.log(postData);
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if(v.match(/(#[^\s#]+)/)){
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                }
                return v;
            })}
        </div>
    );
}

export default PostCardContent;