const mongoose = require("mongoose");
const validator = require('validator');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    userType: {
      type: String,
      enum: ["CUSTOMER", "STAFF"],
    },
    role: [
      {
        id: { type: Number },
        user_type: { type: String },
        active: { type: String },
      },
    ],
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    middleName: {
      type: String,
    },
    mobileNo: {
      type: Number,
      unique: [true, "mobileNo is already present"],
      minlength: 10,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email Id is already present"],
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 8,
      validate(value) {
        if (
          !value.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          )
        ) {
          throw new Error(
            "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
          );
        }
      },
    },
    pancard: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "VERIFICATION_PENDING"],
    },
    isBlocked: {
      type: Boolean,
    },
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      district: String,
      pincode: Number,
    },
    orders: [
      {
        orderId: { type: String, unique: true , default: uuid},
        productList: [
          {
            productId: { type: String },
            quantity: { type: Number },
            color: { type: String },
          },
        ],
        status: { type: String },
        payment: {
          mode: { type: String },
          amount: { type: Number },
          status: { type: String },
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.isEmailTaken = async function (email, excludestudentId) {
  const user = await this.findOne({ email, _id: { $ne: excludestudentId } });
  return !!user;
};

userSchema.statics.isMobileNoTaken = async function (mobileNo) {
  const user = await this.findOne({ mobileNo });
  return !!user;
};
userSchema.methods.isPasswordMatch = async function (oldPassword) {
  const student = this;
  return bcrypt.compare(oldPassword, student.password);
};
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    if (!this.userId || typeof this.userId !== "string") {
      this.userId = uuid();
    }
  }

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // if (this.isModified("orders")) {
  //   const uniqueIds = new Set();
  //   this.orders.forEach((order) => {
  //     if (!order.orderId || uniqueIds.has(order.orderId)) {
  //       order.orderId = uuid();
  //     }
  //     uniqueIds.add(order.orderId);
  //   });
  // }

  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
