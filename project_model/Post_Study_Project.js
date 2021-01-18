const Post_Study_Project_Schema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 100
    },

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

    used_tech: {
        type: Array,
        default: []
    },

    location: String,

    ppl_num: {
        type: Number,
        default: 1
    },

    field:{
        type: String
    },

    is_ongoing: {
        type: Boolean,
        default: True
    }

})