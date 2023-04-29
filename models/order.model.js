const mongoose=require('mongoose')
const { v4: uuid } = require('uuid');

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
      required: [true, "customer id is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "price is required"],
    },
    gstNo: {
      type: String,
    },
    productList: [
        {
            productId:{type:String},
            quantity:{type:Number}
        }
    ],
    dateOfOrderAccept: {
      type: String,
    },
    status:{
        type:String,
        enum:["PENDING","ACCEPTED PARTIALLY,IN-TRANSIT,DISPATCHED,ACCEPTED"],
        default:"PENDING"
    },
    remark:{
        type:String
    },
    paymentVerify:{
        type:String
    }
  },
  { timestamps: true }
);
orderSchema.pre("save", function (next) {
  if (this.isNew) {
    if (!this.orderId || typeof this.orderId !== "string") {
      this.orderId = uuid();
    }
  }
  next();
});
const product = mongoose.model("orders", orderSchema);

module.exports= product;
