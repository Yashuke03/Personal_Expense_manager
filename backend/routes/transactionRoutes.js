const router = require("express").Router();
const c = require("../controllers/transactionController");
const auth = require("../middleware/authMiddleware");
router.use(auth);
router.route("/").get(c.getAll).post(c.create);
router.route("/:id").put(c.update).delete(c.remove);
module.exports = router;
