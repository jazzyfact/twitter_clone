module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { 
        //id가 기본적으로 들어가 있음
       content : {
           type : DataTypes.TEXT,
           allowNull : false,
       },
       //RetweetId
    }, {
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',//이모티콘 저장
    });
    Post.associate = (db) => {
        db.Post.helongsTo(db.User);//작성자
        db.Post.belongsToMany(db.hashtag);//다대다 관계, 해시태그안에 게시글, 게시글안에 해시태그
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongstoMany(db.User, { through : 'Like', as : 'Likers'});//좋아요 누른 사람들 as에 따라서 post.getLikers처럼 게시글 좋아요 누른 사람을 가져 옴
        db.Post.belongsTo(db.Post, {as : 'Retweet'});//리트윗
    };
    return Post;
}