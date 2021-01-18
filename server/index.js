//시작점 
const express = require('express')
const app = express()

const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const { User }=require("./models/User");

//body parser option
//application/x-www-form-urlencoded 형태를 분석해서 가져옴 
app.use(bodyParser.urlencoded({extended:true}));

//application/json 타입을 분석해서 가져옴 
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose')
//소스 암호화 
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))





app.get('/', (req, res) => {
  res.send('Hello World! 헬로뉴월드')
})

app.get('/api/hello',(req,res) => {
  res.send("안녕하세요~")
})

//회원가입 위한 route 생성
//router 의 end point 가 register 
app.post('/api/users/register',(req,res) => {

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


app.post('/api/users/login',(req,res) => {

  //DB 에서 요청된 email 찾기
  User.findOne({ email: req.body.email },(err,user) => {
    if(!user){

      return res.json({
        loginSuccess: false, 
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })

    }
      
  
  //요청한 emmail 이 DB 에 있다면 pw 가 맞는 pw 인지 비교
  user.comparePassword(req.body.password,(err,isMatch) => {

    if(!isMatch)
      return res.json( {
        loginSuccess: false, 
        message: "비밀번호가 틀렸습니다."
      })
    

    //pw 까지 맞다면 user 위한 token 생성 
    user.generateToken((err,user) => {
      if(err) return res.status(400).send(err);
      
      //쿠키에 토큰 저장
      res.cookie("x_auth",user.token)
      .status(200)
      .json({
        loginSuccess: true, 
        userId: user._id
      })
    })
  })
})
})



//auth 는 미들웨어. cb 전에 중간에서 처리하는 역할!
app.get('/api/users/auth',auth , (req,res) => {
  
  //여기까지 미들웨어를 통과했다는 말 == authentication 이 true 라는 말 
  res.status(200).json({

    //auth 에서 req.user = user 했기 때문에 가능
    _id: req.user._id,
    //role == 0 -> 일반 유저, 그 외는 관리자 
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})



//logout route
app.get('/api/users/logout',auth, (req,res) => {

  //logout 하려는 유저를 db 에서 찾아서 token 지우기 
  //_id 는 미들웨어에서 가져와 찾음 
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err,user) => {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    })
})



const port = 5000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})