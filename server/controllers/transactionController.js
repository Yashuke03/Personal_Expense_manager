const Transaction = require("../models/Transaction");
const valid = (body) =>
  body.title &&
  Number(body.amount) > 0 &&
  ["Income", "Expense"].includes(body.type) &&
  Transaction.categories.includes(body.category) &&
  body.date;
exports.getAll = async (req, res, next) => {
  try {
    res.json(
      await Transaction.find({ userId: req.user.id }).sort({ date: -1 }),
    );
  } catch (e) {
    next(e);
  }
};
exports.create = async (req, res, next) => {
  try {
    if (!valid(req.body))
      return res
        .status(400)
        .json({ message: "Please provide valid transaction details." });
    res
      .status(201)
      .json(await Transaction.create({ ...req.body, userId: req.user.id }));
  } catch (e) {
    next(e);
  }
};
exports.update = async (req, res, next) => {
  try {
    if (!valid(req.body))
      return res
        .status(400)
        .json({ message: "Please provide valid transaction details." });
    const t = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true },
    );
    if (!t) return res.status(404).json({ message: "Transaction not found." });
    res.json(t);
  } catch (e) {
    next(e);
  }
};
exports.remove = async (req, res, next) => {
  try {
    const t = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!t) return res.status(404).json({ message: "Transaction not found." });
    res.json({ message: "Transaction deleted." });
  } catch (e) {
    next(e);
  }
};
