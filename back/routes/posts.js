const express = require('express');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/',async (req, res, next) => { //GET /posts 여러개
   try {
    const posts = await Post.fineAll({
        limit : 10,
        order : [
            ['createdAt', 'DESC'],
            [Comment, 'createdAt', 'DESC']
        ],
        include : [{
            model : User,//작성자
            attributes : ['id', 'nickname'],
        }, {
            model : Image,
        }, {
            model : Comment,
            include : [{
                model : User,
                attributes : ['id', 'nickname'],
            }]
        }, {
            model : User, //좋아요 누른 사람
            as : 'Likers',
            attributes : ['id'],
        }, {
            model : Post, //리트윗
            as : 'Retweet',
            include : [{
              model : User,
              attributes : ['id', 'nickname'],
            }, {
              model : Image,
            }],
    });
    res.status(200).json(posts);
   }catch(error){
       console.error(error);
       next(error);
   }
});

module.exports = router;