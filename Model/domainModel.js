const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const domainSchema = new Schema({
  domainName: { type: String, unique: true },
  name: { type: String },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
  renewalDate: {
    type: Date,
    required: true,
  },
  description: { type: String },
  screenshot: { type: String },
});


module.exports = domainModel = mongoose.model("domain", domainSchema);
