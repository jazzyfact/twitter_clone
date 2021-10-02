module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //MYSQL에는 users 테이블 생성
        //id가 기본적으로 들어가 있음
        email : {
            type : DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull : false, //필수
            unique : true, //고유한 값
        },
        nickname : {
            type : DataTypes.STRING(30),
            allowNull : false, //필수
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : false, //필수
        },
    }, {
        charset : 'utf8',
        collate : 'utf8_general_ci',//한글 저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);//사람이 post를 여러개 가질 수 있음
        db.User.hasMany(db.Comment);
        db.User.belongstoMany(db.Post, { through : 'Like'}, as : 'Liked');//내가 좋아요를 누른 게시글
        //foreingkey로 구분 해줌(컬럼id를 구분해줌)
        db.User.belongstoMany(db.User, { through : 'Follow', as : 'Followers', foreignkey : 'FollowingId'});
        db.User.belongstoMany(db.User, { through : 'Follow', as : 'Followings', foreignkey : 'FollowerId'}); //나
    };
    
    return User;
};