const mongoose = require("mongoose");


// comp_name, comp_type, comp_participants,rating

const ccmSchema = new mongoose.Schema(
  {
    comp_id:{
      unique:true,
      type:Number,
      required:[true,"ID is required"]
    },
    comp_name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Compitition Name Name is required"],
    },
    comp_type: {
      type: String,
      trim: true,
      required: [true, "Compitition type is required"],
    },
    comp_participants: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
    },
  
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Competition",ccmSchema );
