const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(port, '포트 번호로 서버가 실행되었습니다.');
});
