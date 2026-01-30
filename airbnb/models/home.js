const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');
const { Types } = require("mysql2");
const favourite = require("./favourite");

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


homeSchema.pre('findOneAndDelete', async function() {
const houseId = this.getQuery()._id;
await favourite.deleteMany({houseId:houseId});

});

module.exports = mongoose.model('home',homeSchema);