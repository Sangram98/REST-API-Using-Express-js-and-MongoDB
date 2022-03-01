const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    product_id:{
      type:String,
      required:true,
      trim:true
     },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    image: {
      type: Object,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    isView: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "product",
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
