//production 인지 dev 인지에 따라 분기 처리
if(process.env.NODE_ENV === 'production') {
    module.exports=require('./prod');
}else{
    module.exports=require('./dev');
}