const express =require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); //파일시스템

const { Post, Image, Comment, User, Hashtag} =require('../models');
const { isLoggedIn } = require('./middlewares');


const router = express.Router();

try {
    fs.accessSync('uploads');
} catch(error){
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
  }

const upload = multer({
  storage : multer.diskStorage({
      destination(req, file, done){
          done(null, 'uploads');
      },
      filename(req, file, done){// hello.png
          const ext = path.extname(file.originalname); //확장자 추출(.png)
          const basename = path.basename(file.originalname, ext); //hello
          done(null, basename + '_' + new Date().getTime() + ext); //hello2234314.png
      },
   }),
   limits : { fileSize: 20 * 1024 * 1024}, //20MB
});

//게시글 작성
router.post('/',isLoggedIn, upload.none(), async (req, res) => {  //POST, /post
    try{
      const post = await Post.create({
        content : req.body.content,
        UserId : req.user.id,
        });
        //해시태그
        if(hashtags) {
          //없으면 등록, 있으면 가져오기
         const result = await Promise.all(hashtags.map((tag) => Hashtag.create.findeOrCreate({ 
           where : { name : tag.sclice(1).toLowerCase() },
          }))); // [[#해쉬, true], [#해쉬태그, true]]
          await post.addHashtagas(result.map((v) => v[0]));
        }
        //이미지
        if(req.body.image){
          if(Array.isArray(req.body.image)) { //이미지 여러 개 올리면 images: {hi.png, hello.png}
         const images = await Promise.all(req.body.image.map((image) => {
            Image.create({ src : image });
          })); 
          await post.addImages(images);
          } else { //이미지를 하나만 올리면 imgae : hello.png
            const image = await Image.create({ 
              src : req.body.image
            });
            await post.addImages(images);
          }
        }
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


//다중 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { //POST /post/images
    //이미지 업로드 후
    console.log(req.files); //업로드 된 이미지 정보
    res.json(req.files.map((v) => v.filename));

});

//리트윗
router.post('/:postId/retweet', isLoggedIn, async (req, res) => {  //POST, /post/1/comment
  try{
      await Post.findOne({
          where : { id : req.params.postId},
          include : [{
            model : Post,
            as : 'Retweet',
          }],
      });
      if(!post){
          return res.status(403).send('존재하지 않는 게시글입니다');
      }
      //내 글 내가 리트윗, 남이 내글 리트윗한거 다시 리트윗 방지
      if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
        return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');  
      }
      //다른 사람이 쓴 글 리트윗
      const retweetTargetId = post.RetweetId || post.id;
      const exPost = await Post.findOne({
        where : {
          UserId : res.user.id,
          RetweetId : retweetTargetId,
        },
      });
      if (exPost) {
        return res.status(403).send('이미 리트윗 했습니다.');  
      }
      //
     const retweet = await Post.create({
        UserId : req.user.id,
        RetweetId : retweetTargetId,
        content : 'retweet',
      });
      //어떤 게시글을 리트윗 했는지
      const retweetWithPrevPost = await Post.findOne({
        where : { id : retweet.id },
        include : [{
          model : Post,
          as : 'Retweet',
          include : [{
            model : User,
            attributes : ['id', 'nickname'],
          }, {
            model : Image,
          }]
        }, {
          model : User,
          attributes : ['id', 'nickname'],
        }, {
          model : Image,
        }, {
          model : Comment,
          include : [{
            model : User,
            attributes : ['id', 'nickname'],
          }],
        }],
      })
      res.status(201).json(retweetWithPrevPost);
    } catch(error){
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
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
    try {
      const post = await Post.findOne({ where: { id: req.params.postId }});
      if (!post) {
        return res.status(403).send('게시글이 존재하지 않습니다.');
      }
      await post.addLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  //좋아요 취소
  router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
    try {
      const post = await Post.findOne({ where: { id: req.params.postId }});
      if (!post) {
        return res.status(403).send('게시글이 존재하지 않습니다.');
      }
      await post.removeLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  
  router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/10
    try {
      await Post.destroy({
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      });
      res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;