const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

//salt 이용해서 비밀번호 암호화
//salt 가 몇 글자인지 결정 
const saltRounds=10

var jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength : 50
    },
    email: {
        type: String,
        trim: true, //jiwon lim@naver.com 이라고 치면 space 를 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //관리자/ 일반 유저 구분
        type: Number,
        default: 0
    },
    image: String,
    token: {    //유효성 관리
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//index.js 에서 user 정보 저장 전에 수행할 함수
//next 하면 index.js 에서 user 정보 저장하는 부분으로 들어옴
userSchema.pre('save',function( next ){
    //userShchema 가리킴 
    var user=this;

     //pw 변경 시에만 pw 암호화
     if(user.isModified('password')){
         //salt 생성해서 비밀번호 암호화
         bcrypt.genSalt(saltRounds, function(err, salt) {
             if(err) return next(err)
             
             //user.password : 암호화되지 않은 비밀번호 
             bcrypt.hash(user.password, salt, function(err, hash) {
                 if(err) return next(err)
                 
                 //암호화에 성공하면, hash 된 pw 로 변경 
                 user.password = hash
                 next()
                })
            })
        }else{

            //다른 정보 변경시 next 로 보내기! 
            next()
        }
})


userSchema.methods.comparePassword = function(plainPassword, cb) {
    
    //plainPassword 1234567     DB 의 암호화된 PW :$2b$10$M5eUlYaoN2VPam1W244KUOWimrqTHFzjjV97eTSau8C80zTy12QpO
    //plainPassword 를 암호화하고 비교
    bcrypt.compare(plainPassword, this.password,function(err,isMatch) {
        //다르면 
        if(err) return cb(err)
        //다르면 
        else cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    var user=this;

    //jsonwebtoekn 이용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

   //user._id + 'secretToken' = token 이므로 token 으로 누군지 판단 

   user.token=token
   user.save(function(err,user) {
       if(err) return cb(err)

       //err 없다면 user 정보만 전달 
       else cb(null,user)
   })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    
    //토큰 decode
    jwt.verify(token, 'secretToken',function(err,decoded) {

        //user id 이용해서 user 찾고 
        //client 의 token 가 DB 에 보관된 token 이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err,user){
            if(err) return cb(err);
            
            //err 없다면 user 정보 전달 
            cb(null, user)
        })
    })   
}


const User = mongoose.model('User',userSchema)

//다른 곳에서도 쓸 수 있도록
module.exports = {User}