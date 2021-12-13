const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PinSchema = new mongoose.Schema(
  {
    postId:{
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    lat:{
      type: Number,
      require: true,
    },
    long:{
      type: Number,
      require: true,
    },
  },
    { timestamps: true } ,  
);

module.exports = mongoose.model("Pin", PinSchema);