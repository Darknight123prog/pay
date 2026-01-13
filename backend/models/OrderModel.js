const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
  amount:{
      type:Number,
      required:true
  },
  User:{
    type:String,
    required:true
  },
  ProductsName:{
    type:String,
    required:true
  },
  trancactionId:{
    type:String,
    required:true
  }


},{timestamps:true})

module.exports=mongoose.model('Order',OrderSchema);