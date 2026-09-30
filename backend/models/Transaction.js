const mongoose = require("mongoose");
const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Health",
  "Other",
];
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0.01 },
    type: { type: String, required: true, enum: ["Income", "Expense"] },
    category: { type: String, required: true, enum: categories },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Transaction", schema);
module.exports.categories = categories;
