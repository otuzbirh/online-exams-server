const { dashboardTotal } = require('../controllers/dashboardController')

const authMiddleware = require("./../middleware/authMiddleware")
const router = require("express").Router();

router.get("/stats", authMiddleware, dashboardTotal);

module.exports = router;
