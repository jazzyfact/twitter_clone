const express =require('express');

const { Post } =require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/',isLoggedIn, async (req, res) => {  //POST, /post
    try{
      const post = await Post.create({
        content : req.body.content,
        UserId : req.user.id,
        });
        //방금 생성한 게시글 전체 정보
        const fullPost = await Post.findOne({
            where : { id : post.id},
            include : [{
                model : Image,
            },{
                model : Comment,
                include : [{
                    model : User,//댓글 작성자
                    attributes : ['id', 'nickname'],
                }]
            },{
                model : User, //게시글 작성자
                attributes : ['id', 'nickname'],
            }, {
                model : User,//좋아요 누른 사람
                as : 'Likers',
                attributes : ['id'],
            }]
        })
         res.status(201).json(fullPost);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//댓글
router.post('/:postId/comment', isLoggedIn, async (req, res) => {  //POST, /post/1/comment
    try{
        await Post.findOne({
            where : { id : req.params.postId},
        });
        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다');
        }
        const comment = await Comment.create({
            content : req.body.content,
            PostId : parseInt(req.params.postId, 10),
            UserId : req.user.id,
        })
        const fullComment = await Comment.findOne({
            where : { id : comment.id},
            include : [{
                model : User,
                attributes : ['id', 'nickname'],
            }],
        })
      const post = await Post.create({
        content : req.body.content,
        });
         res.status(201).json(post);
    }catch(error){
        console.error(error);
        next(error);
    }
});

//좋아요
router.patch('/:postId/like',async (req, res, next) => { //PATCH /post/1/like
    try{
        //게시글이 있는지 검사
        await post = await Post.findOne({
            where : {
                id : req.params.postId
            }
        });
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
       await this.post.addLikers(req.user.id);
       res.json({ PostId : post.id, UserId : req.user.id });
    }catch(error){
        console.error(error);
        next(error);
    }
   
})

//좋아요 취소
router.delete('/:postId/like', async (req, res, next) => {//DELETE /post/1/like
    try{
        //게시글이 있는지 검사
        await post = await Post.findOne({
            where : {
                id : req.params.postId
            }
        });
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await this.post.removeLikers(req.user.id);
        res.json({ PostId : post.id, UserId : req.user.id });
    }catch(error){
        console.error(error);
        next(error);
    }
})


router.delete('/', (req, res) => { //DELETE /post
    res.json({id});
});

module.exports = router;