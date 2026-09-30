const Budget = require("../models/Budget");
exports.get = async (req, res, next) => {
  try {
    const d = new Date();
    res.json(
      (await Budget.findOne({
        userId: req.user.id,
        month: d.getMonth(),
        year: d.getFullYear(),
      })) || { amount: 0, month: d.getMonth(), year: d.getFullYear() },
    );
  } catch (e) {
    next(e);
  }
};
exports.set = async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    if (amount < 0 || Number.isNaN(amount))
      return res
        .status(400)
        .json({ message: "Budget must be zero or greater." });
    const d = new Date();
    res.json(
      await Budget.findOneAndUpdate(
        { userId: req.user.id, month: d.getMonth(), year: d.getFullYear() },
        { amount },
        { upsert: true, new: true, runValidators: true },
      ),
    );
  } catch (e) {
    next(e);
  }
};
