const mongoose = require('mongoose');
const User = require("../models/user");


const homeSchema = mongoose.Schema({
  homeName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  image: String,
  description: String,
})




homeSchema.pre("findOneAndDelete", async function () {
  const houseId = this.getQuery()._id;

  await User.updateMany(
    {},
    { $pull: { favourites: houseId } }
  );


});



module.exports = mongoose.model('home',homeSchema);