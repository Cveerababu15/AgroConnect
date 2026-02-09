const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    farmerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantityKg:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected","Picked","Delivered"],
        default:"Pending"
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
      }
},
{timestamps:true}
)
module.exports=mongoose.model("Order",orderSchema)