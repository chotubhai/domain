const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const clientSchema = new Schema({
  email: { type: String, unique: true },
  name: { type: String, required: true },
  address: { type: String },
  mobile: { type: Number },
  password: { type: String, required: true },
  totalDomains: { type: Number },
  status: {
    enum: ["active", "inactive"],
    type: String,
    default: "active",
  },
});

clientSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

module.exports = clientModel = mongoose.model("client", clientSchema);
