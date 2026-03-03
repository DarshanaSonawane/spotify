const mongoose=require('mongoose');


async function connectDB(){

    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("data connected successfully");
    }catch(error){
        console.error("database connection failed");
    }
}

module.exports=connectDB;
