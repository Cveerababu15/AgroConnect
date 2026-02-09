const mongoose=require("mongoose");
const productschema=new mongoose.Schema({
    farmerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    name:{type:String,required:true},
    pricePerKg:{type:Number,required:true},
    quantityAvailable:{type:Number,required:true},
    isAvailable:{type:Boolean,default:true},

},
{timestamps:true}
);

module.exports=mongoose.model("Product",productschema);