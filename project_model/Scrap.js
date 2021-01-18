const ScrapSchema = mongoose.Schema({
   
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

   post_study_project_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post_Study_Project
   },

   post_Forum_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post_Forum
   }

})