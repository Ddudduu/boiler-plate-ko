const CommentSchema = mongoose.Schema({
    //작성자
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

    //해당 게시물 id
    Post_Id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : Post
    },

    //댓글 내용
    content:{
        Type: String
    },

    /*
    published_date: {
        type: Date,
        default: Date.now
    },
    */
   
    //어떤 user에게 댓글 남겼는지 
    commentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }  

})