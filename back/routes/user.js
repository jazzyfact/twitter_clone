const express = require('express');
const bcrypt = require('bcrypt');
const passport  = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const db = require('../models');

const router = express.Router();

//내정보가져오기
router.get('/', async(req, res, next) => {//GET /user
  try{
    if(req.user){
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes : ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes : ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes : ['id'],
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  }catch(error){
    console.error(error);
    next(error);
  }
});




//회원가입
router.post('/', isNotLoggedIn, async (req, res ,next) =>{ //POST /user/
  try{
      //이메일 중복체크
    const exUser = await User.findOne({
          where : {
              email : req.body.email,
          }
      });
      if(exUser){
         return res.status(403).send('이미 사용중인 아이디입니다.'); // 요청 한번에 응답 한번
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      await User.create({
          email: req.body.email, //front에서 준 데이터 넣기
          nickname: req.body.nickname,
          password: hashedPassword,
        });
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060'); //3060에서 오는 것은 다 허용, * 은 전체허용
      res.status(201).send('ok'); //200 성공 300 리다이렉트 400 클라이언트에러 500 서버에러
  }   catch(error){
      console.error(error); //status 500
      next(error); //next를 통해서 error를 보냄, 한번에 처리 가능
  }
});


//로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            //서버에러
            console.log(err);
            return next(err);
        }
        if(info){
            //클라이언트에러
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr){
                console.log(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                  exclude: ['password']
                },
                include: [{
                  model: Post,
                  attributes : ['id'],
                }, {
                  model: User,
                  as: 'Followings',
                  attributes : ['id'],
                }, {
                  model: User,
                  as: 'Followers',
                  attributes : ['id'],
                }]
              })
            //res.setHeader('Cookie', 'cxlhy')
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});



//로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

//닉네임 수정
router.patch('/nickname', isLoggedIn, async(req, res, next) => {
  try{
    await User.update({
      nickname : req.body.nickname, //front에서 받은 닉네임
    }, {
      where : { id : req.user.id};
    });
    res.status(200).json({ PostId : req.params.postId});
  }catch(error){
    console.error(error);
    next(error);
  }
})

module.exports = router;