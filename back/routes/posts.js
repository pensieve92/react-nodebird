const express = require('express');

const { Post, User, Image, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const posts = await Post.findAll({

            // limit, offset으로 원하는 구간만 가져올 수 있음 
            // 실무에서는 잘 쓰지 않음, 
            // 단점이 중간에 게시물을 추가, 삭제시 >  중복 또는 누락으로 조회될 수있다.
            
            limit: 10,  // 건수 제한
            // offset: 0,  // 1~10
            // offset : 0   >> 1 ~ 10    게시글
            // offset : 10  >> 11 ~ 20   게시글
            // offset : 100 >> 101 ~ 110 게시글

            // lastId 방식을 사용한다.
            // where: { id: lastId }, 

            // 최신부터
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'], // 댓글 정렬 // include에서 정렬
            ],

            include: [
                {
                    model: User,                
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }, {
                    model: Comment,
                    include:[{
                        model: User,
                        attributes: ['id', 'nickname'],
                    }]
                }, {
                    model: User, // 좋아요 누른 사람 >> post.Likers
                    as: 'Likers',
                    attributes: ['id'], 
                }
            ],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
    
});

module.exports = router;
