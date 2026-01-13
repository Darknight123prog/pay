const  mongoose  = require("mongoose");

const ConnectDB=async()=>{
  try{
  const BD_data=await mongoose.connect(process.env.DATA_BASE_URI);
  console.log(`sucessfully connected to DB`)
  }
  catch(err){
    console.log(`cannot connect with the DB ${err}`)
  }

  
  
  }
  module.exports={ConnectDB};