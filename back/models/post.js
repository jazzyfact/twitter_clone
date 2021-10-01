module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { 
        //id가 기본적으로 들어가 있음
       content : {
           type : DataTypes.TEXT,
           allowNull : false,
       },
    }, {
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',//이모티콘 저장
    });
    Post.associate = (db) => {
        db.Post.helongsTo(db.User);
        db.Post.belongsToMany(db.hashtag);//다대다 관계, 해시태그안에 게시글, 게시글안에 해시태그
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
    };
    return Post;
}