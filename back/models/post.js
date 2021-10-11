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
        db.Post.belongsTo(db.User);//작성자, post.addUser, post.getUser, post.setUser
        //다대다 관계, 해시태그안에 게시글, 게시글안에 해시태그
        db.Post.belongsToMany(db.Hashtag,  { through : 'PostHashtag'});//post.addHashtags
        db.Post.hasMany(db.Comment);//post.addComments, post.getComments
        db.Post.hasMany(db.Image);//post.addImages, post.getImages
        //좋아요 누른 사람들 as에 따라서 post.getLikers처럼 게시글 좋아요 누른 사람을 가져 옴
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); //post.addLikers, post.removeLikers
        db.Post.belongsTo(db.Post, {as : 'Retweet'});//post.addRetweet
    };
    return Post;
}