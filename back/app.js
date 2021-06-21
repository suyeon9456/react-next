const express = require('express'); // 노드가 서버가 아니라 노드에서 제공하는 http 모듈이 서버
const postRouter = require('./routes/post');
// const server = http.createServer((req, res)=> {
//   console.log(req.url, req.method);
//   res.write('node Server1');
//   res.write('node Server2');
//   res.end('node server5');
// });
const app = express();

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

app.listen(3065, () => {
  console.log('서버 실행중');
});