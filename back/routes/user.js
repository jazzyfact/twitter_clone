const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const e = require('express');
const { noExtendRight } = require('sequelize/types/lib/operators');

const router = express.Router();

router.post('/', async (req,res ,next) =>{ //POST /user/
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
            email : req.body.email,
            nickname : req.body.nickname,
            password : hashedPassword,
        });
        res.status(201).send('ok'); //200 성공 300 리다이렉트 400 클라이언트에러 500 서버에러
    }   catch(error){
        console.error(error); //status 500
        next(error); //next를 통해서 error를 보냄, 한번에 처리 가능
    }
});

module.exports = router;