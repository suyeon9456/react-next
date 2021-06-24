const express = require('express'); // 노드가 서버가 아니라 노드에서 제공하는 http 모듈이 서버
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
// const server = http.createServer((req, res)=> {
//   console.log(req.url, req.method);
//   res.write('node Server1');
//   res.write('node Server2');
//   res.end('node server5');
// });
const app = express();

const db = require('./models');
db.sequelize.sync()
  .then(() => {
    console.log('db 연결d 성공!');
  }).catch(console.error);
// 처음 데이터베이스 생성할 땐 npx sequelize db:create

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello node');
});


app.get('/api', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'test1' },
    { id: 2, content: 'test2' },
    { id: 3, content: 'test3' }
  ])
})

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});