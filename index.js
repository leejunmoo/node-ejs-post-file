const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
// fs 모듈 = node.js 내장모듈 ( 읽고 쓰기 )


let posts = []; // 글
// 파일 읽기
const readfile = fs.readFileSync('postDB.json', 'utf-8');
// 오브젝트 코드로 변환
const jsonData = JSON.parse(readfile);
// console.log(jsonData);
posts = [...jsonData]; // post에 배열값 추가




// ejs를 view 엔진으로 설정
app.set('view engine', 'ejs');

// 정적파일 경로 지정
app.use(express.static("public"));
// post로 정보받을때 꼭 적어줘야함 읽고 쓰기같은거
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// home
app.get('/', function(요청, 응답){
  응답.render('pages/index.ejs', { posts })
})

// about
app.get('/about', function(req, res) {
  res.render('pages/about.ejs')
})

// 글쓰기 요청create
app.post('/create', function(req, res) {
  const 글 = req.body.post;
  posts.push(글);

  // posts 배열에 글추가
  console.log(posts);
  // DB file 에 글 저장
  fs.writeFileSync('postDB.json', JSON.stringify(posts))
  // 홈(게시판)으로 이동
  res.redirect('/');

})

// 글삭제 요청 /delete
app.post('/delete/:id', function(req, res){
  const id = req.params.id;
  console.log(id)
  // 누르는 버튼에 해당하는 id 배열 삭제
  posts.splice(id, 1)
   // DB file 에 글 저장
   fs.writeFileSync('postDB.json', JSON.stringify(posts))
   // 홈(게시판)으로 이동
   res.redirect('/');
   console.log(posts)
})


// alert 경고문 띄워보려고햇으나..실패 ..sibal!
/* app.post('/create', (req, res) => {
  if(post == '') { // admin 유저가 아니면
    return res.render('alert', {error: '잘못된 접근입니다'});
  }
}) */

const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`)
})