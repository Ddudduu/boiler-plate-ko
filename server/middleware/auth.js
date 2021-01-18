const { User } = require("../models/User");

let auth = (req, res,next) => {
    //인증 처리

    //client cookie 에서 token 가져오기
    let token = req.cookies.x_auth;
    
    //token 복호화 후 user 찾기 
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.js({isAuth: false, error: true})

        //req 받을 때 token, user 정보 가질 수 있도록 
        req.token = token;
        req.user = user;

        //index.js 의 미들웨어에서 넘어갈 수 있게!
        next();
    })

    //user 가 존재하면 인증 okay

    //user 없으면 인증 no!
}





module.exports={auth}