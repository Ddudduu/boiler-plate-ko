const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        maxlength : 50,
        unique: 1,
        required: true
    },

    email: {
        type: String,
        trim: true, 
        unique: 1,
        required: true
    },

    password: {
        type: String,
        minlength: 5,
        required: true
    },
    
    program_language:{
    type: Array,
    default: []
    },

    framework:{
        type: Array,
        default: []
    },

    DB:{
        type: Array,
        default: []
    },

    Cloud:{
        type: Array,
        default: []
    },

    ML_DL:{
        type: Array,
        default: []
    },
    //program_language: [java, C, C++, JS, SQL, Swift, Kotlin, php, R],

    //framework: [Spring, React, AngularJS,Vue,Laravel,Django,STRUTS],

    //DB:[ORACLE, SQL Server, MySQL,SQLite,MariaDB,SYBASE,MongoDB,PostgreSQL],
    
    //Cloud:[AWS],
     //aws 이외의 어떤게 있는지 몰라서 일단 이것만 썼습니다!

    //ML_DL:[Tensorflow,Keras,Theano,Scikit-learn, PyTorch,Numpy,Pandas,Seaborn],    
    
    githubUrl: String,

    image: String,

})

