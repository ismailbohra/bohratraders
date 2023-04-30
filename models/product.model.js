const mongoose=require('mongoose')
const { v4: uuid } = require('uuid');

const productSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    featured: {
      type: Boolean,
    },
    rating: {
      type: Number,
    },
    company: {
      type: String,
    },
  },
  { timestamps: true }
);
productSchema.pre("save", function (next) {
  if (this.isNew) {
    if (!this.productId || typeof this.productId !== "string") {
      this.productId = uuid();
    }
  }
  next();
});
const product = mongoose.model("product", productSchema);

module.exports= product;
