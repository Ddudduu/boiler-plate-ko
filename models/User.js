const mongoose=require('mongoose');


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

const User = mongoose.model('User',userSchema)

//다른 곳에서도 쓸 수 있도록
module.exports = {}