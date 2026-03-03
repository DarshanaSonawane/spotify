const mongoose=require('mongoose');

const albumSchema=new mongoose.schema({

    title:{

        type:String,
        required:true
    }

    musics:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"music"
    },
    artists:{
    
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    
    }
});


const albumModel=mongoose.model("Album", albumSchema);

module.exports=albumModel;