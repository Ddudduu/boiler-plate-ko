const LikeSchema = mongoose.Schema({
   
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

   comment_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment
   },

   post_Forum_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post_Forum
   }

})