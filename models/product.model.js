const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const productSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
    },
    brand: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
    },
    price_sign: {
      type: String,
    },
    currency: {
      type: String,
    },
    image_link: {
      type: String,
    },
    product_link: {
      type: String,
    },
    website_link: {
      type: String,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
    },
    category: {
      type: String,
    },
    product_type: {
      type: String,
    },
    tag_list: {
      type: [String],
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
    product_api_url: {
      type: String,
    },
    api_featured_image: {
      type: String,
    },
    product_colors: [
      {
        hex_value: {
          type: String,
        },
        colour_name: {
          type: String,
        },
      },
    ],
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
