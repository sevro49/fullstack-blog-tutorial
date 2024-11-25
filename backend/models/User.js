const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user"}
});

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// Compare password
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
}

// Customize toJSON method to remove sensitive data
userSchema.methods.toJSON = function () {
  const user = this.toObject(); // convert mongoose document to plain JavaScript object
  delete user.password;
  delete user.__v;
  return user;
};

module.exports = mongoose.model('User', userSchema);