const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,message:"Name Is Mandatory"},
    email:{type:String,unique:true,message:"Email is Mandataory"},
    password:{type:String,required:true,minlength:6},
    role:{
        type:String,
        enum:["farmer","restaurant","driver"]
    },
},
{timestamps:true}
)

module.exports=mongoose.model("User",userSchema)
