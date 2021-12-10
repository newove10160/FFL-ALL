const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId:{
        type:String,
        required: true,
    },
    desc:{
        type:String,
        max:500,
    },
    img:{
        type:String,
    },
    likes:{
        type: Array,
        default:[],
    },
    tag:{
      type: String,
      enum: ['APPLIANCES', 'CLOTHES','FURNITURES', 'MEDICAL', 'OTHERS', 'STUDY' ],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);