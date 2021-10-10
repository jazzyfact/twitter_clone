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
         res.status(201).json(post);
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
            PostId : req.params.postId,
            UserId : req.user.id,
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

router.delete('/', (req, res) => { //DELETE /post
    res.json({id});
});

module.exports = router;