const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/',async (req, res, next) => { //GET /posts 여러개
   try {
    let where = {};
    if (parseInt(res.query.lastId, 10)) { //초기 로딩이 아닐 떄
        where.id = {[ 0p.lt ]: parseInt(req.query.lastId, 10)} //마지막 아이디 보다 작은 것
    }//21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.fineAll({
        where,
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