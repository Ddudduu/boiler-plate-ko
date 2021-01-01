//시작점 
const express = require('express')
const app = express()
const port = 3000
const bodyParser=require('body-parser');
const { User }=require("./models/User");


//body parser option
//application/x-www-form-urlencoded 형태를 분석해서 가져옴 
app.use(bodyParser.urlencoded({extended:true}));

//application/json 타입을 분석해서 가져옴 
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://JiwonLim:abcd1234@boilerplate.ez3xq.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))





app.get('/', (req, res) => {
  res.send('Hello World! 헬로뉴월드')
})


//회원가입 위한 route 생run성
//router 의 end point 가 register 
app.post('/register',(req,res) => {

  //회원가입 시 필요한 정보 client 에서 가져오면 DB 에 넣어줌.
  const user=new User(req.body)
  //정보들이 user model 에 저장
  user.save((err,userInfo) => {
    //성공하지 못했다고 json 형식으로 전달 
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})