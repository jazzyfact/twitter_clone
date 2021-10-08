const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
passportConfig();

//미들웨어, 위에서 아래로, 왼쪽 오른쪽, 상위에 적어야 함
app.use(cors({
    origin : '*',
    credentials :false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


app.get('/', (req,res) => {
    res.send('hello express');
});

app.get('/api', (req,res) => {
    res.send('hello api');
});

app.get('/posts', (req, res) => {
    res.json([
        {id : 1, content : 'hello1'},
        {id : 2, content : 'hello2'},
        {id : 3, content : 'hello3'},
    ]);
});

//중복되는걸 빼줌
app.use('/post',postRouter);
app.use('/user',postRouter);


app.listen(3065, () => {
    console.log('서버실행중');
});