const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Validate phone number is 10 digits
      },
      message: "Phone number is not valid!"
    }
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: [8, "Password must be atleast 8 characters long."],
  //   select: false,
  // },
  domains: { type: [String], required: true },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  token: {
    type: String,
    default: null,
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
});

formDataSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

// userSchema.pre("save", async function(next) {
//   if(!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);

//   this.password = await bcrypt.hash(this.password, salt);
 
//   next();
// })

// userSchema.methods.comparePassword = async function(password){
//   return await bcrypt.compare(password, this.password);  
// } 

const FormData = mongoose.model("FormData", formDataSchema);

module.exports = FormData;
