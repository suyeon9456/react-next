const http = require('http');
const server = http.createServer((req, res)=> {
  console.log(req.url, req.method);
  res.write('node Server1');
  res.write('node Server2');
  res.end('node server5');
});

server.listen(3065, () => {
  console.log('서버 실행중');
});