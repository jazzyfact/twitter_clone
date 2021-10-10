const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField : 'email', //req.body.email
        passwordField : 'password',
    }, async (email, password, done) => {
        try{
            const exUser = await User.findOne({
                where : { email } //기존 유저가 있는지
            });
            if(!user) {
                done(null, false, {reason : '존재하지 않는 이메일 입니다.'}) //done(서버에러, 성공, 클라이언트 에러)
            }
            const result = await bcrypt.compare(password, user.password);
            if( result){
                return done(null, user); //성공, 사용자 정보 넘겨주기
            }
            return done(null, false, { reason : '비밀번호가 틀렸습니다.' });
        }catch(error){
            console.log(error);
            return done(error);
        }
    }));
};