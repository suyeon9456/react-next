const express = require('express'); // 노드가 서버가 아니라 노드에서 제공하는 http 모듈이 서버
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

const postsRouter = require('./routes/posts');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
// const server = http.createServer((req, res)=> {
//   console.log(req.url, req.method);
//   res.write('node Server1');
//   res.write('node Server2');
//   res.end('node server5');
// });
dotenv.config();
const app = express();

const db = require('./models');
const passportConfig = require('./passport');

db.sequelize.sync()
  .then(() => {
    console.log('db 연결d 성공!');
  }).catch(console.error);
// 처음 데이터베이스 생성할 땐 npx sequelize db:create
passportConfig();

app.use(morgan('dev'));

app.use(cors({
  // origin: 'localhost:3060'
  origin: 'http://localhost:3060',
  credentials: true // 기본값 false true 여야 cookie도 같이 전달됨
})); // header에 Access-Control-Allow-Origin를 추가해줌

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('nodebirdsecret'));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello node');
});


app.get('/api', (req, res) => {
  res.send('hello api');
});

// app.get('/posts', (req, res) => {
//   res.json([
//     { id: 1, content: 'test1' },
//     { id: 2, content: 'test2' },
//     { id: 3, content: 'test3' }
//   ])
// })

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});