const mongoose=require('mongoose');
const UserModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        // unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true,
        // unique:true
    },
    favProducts:{
        type:Array,
        default:[]
    },
    cart:{
        type:Array,
        default:[]
    },
    role:{
        type:String,
        default:"user"
    }

},{
    collection:"users",
    timestamps:true
});

module.exports=mongoose.model("User",UserModel)
