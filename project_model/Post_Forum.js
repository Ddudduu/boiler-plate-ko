const Post_Forum_Schema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 100
    },

    //자유 or Q&A 
    post_type:String,

    content: {
        type: String,
        minlength: 5
    },

    attached_file: {
        type: String
    },

    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

    published_date: {
        type: Date,
        default: Date.now
    },

    view_count:{
        type: Number, 
        default: 0
    },

    tag: {
        type: Array,
        default: []
    }

})