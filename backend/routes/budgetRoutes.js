const router = require("express").Router();
const c = require("../controllers/budgetController");
const auth = require("../middleware/authMiddleware");
router.use(auth);
router.route("/").get(c.get).put(c.set);
module.exports = router;
