const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
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
    },
    pin:{
      type: Schema.Types.ObjectId,
      ref: 'Pin' 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);