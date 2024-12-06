const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
  {
    title: { type: String },
    short_des: { type: String },
    des: { type: String },
    img: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const blogModel = mongoose.model('blogs', DataSchema);

module.exports = blogModel;
