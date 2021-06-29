exports.isLoggedIn = (req, res, next) => {
  console.log('req', req);
  if(req.isAuthenticated()){
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log('req', req.isAuthenticated());
  if(!req.isAuthenticated()){
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};