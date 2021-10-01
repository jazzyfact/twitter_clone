module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', { 
        //id가 기본적으로 들어가 있음
       name : {
        type : DataTypes.STRING(20),
        allowNull : false,
       },
    }, {
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',//이모티콘 저장
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post);//다대다 관계, 해시태그안에 게시글, 게시글안에 해시태그
    };
    return Hashtag;
}