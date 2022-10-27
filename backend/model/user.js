const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, 'First name is required'],
   },
   lastName: {
      type: String,
      required: [true, 'Last name is required'],
   },
   email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
   },
   phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
   },
   city: {
      type: String,
      required: [true, 'City is required'],
   },
   address: {
      type: String,
      required: [true, 'Address is required'],
   },
   postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
   },
   isAdmin: {
      type: Boolean,
      default: false,
   }, 
   timestamp: {
      type: Date,
      default: Date.now
   }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
