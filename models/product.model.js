const mongoose=require('mongoose')

const productSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required: [true, "productId is required"],
    },
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    Featured: {
      type: Boolean,
    },
    Rating: {
      type: Number,
    },
    company: {
      type: String,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);

module.exports= product;
