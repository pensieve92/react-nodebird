const { Router } = require('express');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middleware');

try {
    fs.accessSync('uploads');    
} catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
}


const upload = multer({
    storage: multer.diskStorage({   // 하드에 저장 >> 나중에 클라우드에 저장 예정 (스케일링으로 복사시 이미지도 복사되서 용량이 2배됨)
        destination(req, file, done){
            done(null, 'uploads'); // upload할 폴더: uploads
        },
        filename(req, file, done){ // 제로초.png
            // 파일명 중복 방지
            path.ext
            const ext = path.extname(file.originalname); // 확장자 추출 (.png)
            const basename = path.basename(file.originalname, ext); // 제로초
            done(null, basename + '_' +  new Date().getTime() + ext); // 제로초_1610373932315.png
        },
    }),
    // 용량제한 
    // 프론트에서 클라우드로 바로 저장하는 방식이 조금 더 나음
    limits:{ fileSize: 20 * 1024 * 1024 }, // 20MB
})



router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {    // POST /post
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        // res.json({id: 1, content: 'hello'});
        const post = await Post.create({
            content: req.body.content,
            // 로그인 후 passport.deserializeUser 가 실행되어 req.user 정보가 담긴다.
            UserId : req.user.id,
        });

        if(hashtags) {
            // tag.slice(1) '#' 제거
            // Hashtag.findOrCreate 있으면 가져오고, 없으면 등록
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where : { name: tag.slice(1).toLowerCase() }
            }))); // [[노드, true], [리액트, true]]
            await post.addHashTags(result.map((v) => v[0]));
        }

        if(req.body.image) {
            if(Array.isArray(req.body.image)){ // 이미지가 여러개 올리면 image: [제로초.png, 매실.jpg]                
                // Image.create({src: image}) 가 다 프로미스, await Promise.all() await Promise.all 2개가 db에 저장이 된다.
                const images = await Promise.all(req.body.image.map((image) => Image.create({src: image})));
                await post.addImages(images);
            } else { // 이미지를 하나만 올리면 image: 매실.jpg
                const image =  await Image.create({src: req.body.image});
                await post.addImages(image);
            }
        }
        const fullPost = await Post.findOne({
            where: {id: post.id},
            include: [{
                model: Image
            },{
                model: Comment,
                include: [{
                    model: User,    // 댓글 작성자
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User, // 좋아요 누른 사람 >> post.Likers
                as: 'Likers',
                attributes: ['id'], 
            }]
        })
        return res.status(201).json(fullPost);
    } catch (err) {
        console.error(err);
        next(err);
    }    
});


// 이미지 업로드
// 여러장 업로드 upload.array('image'), 한장 업로드 upload.single('image'), 텍스트 upload.none()
router.post('/images', isLoggedIn, upload.array('image'), async(req, res, next) => { // POST /post/images
    // 1. upload.array('image')에서 업로드 후 (req, res, next) => {...} 실행
    console.log(req.files); // 업로드한 이미지에 대한 정보 들어있음
    res.json(req.files.map((v) => v.filename));
})

// 동적으로 변하는 부분을 파라미터라 한다.
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {    // POST /post/1/comment
    try {

        const post =await Post.findOne({
            where: {id: req.params.postId}
        });

        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }

        const comment = await Comment.create({
            content: req.body.content,
            PostId : parseInt(req.params.postId, 10),
            UserId : req.user.id,
        })

        const fullComment = await Comment.findOne({
            where: {id : comment.id}, 
            include : [{
                model: User,
                attributes: ['id', 'nickname'],                
            }],
        })
        // res.json({id: 1, content: 'hello'});
        // const post =await Post.create({
        //     content: req.body.content
        // })
        return res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }    
});

router.patch('/:postId/like', isLoggedIn, async(req, res, next) => { // PATCH /post/1/liked
    try {
        const post = await Post.findOne({
            where : { id: req.params.postId }
        });
        if( !post ){
            return res.status(403).send('해당 게시글이 존재하지 않습니다.');
        }
        // 포스트가 있을 경우 
        // 관계 메서드 ../models 에서 belongsToMany
        await post.addLikers(req.user.id);        
        res.json({PostId: post.id, UserId: req.user.id})
    } catch (error) {
        console.error(error);
        next(error);
    }

});

router.delete('/:postId', isLoggedIn, async(req, res, next) => { // DELETE /post/1
    try {
        await Post.destroy({
            where : {id: req.params.postId },
            UserId: req.user.id,
        })        
        res.json({PostId: parseInt(req.params.postId, 10) })
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router
