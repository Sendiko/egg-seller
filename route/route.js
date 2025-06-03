const express = require("express");
const OrderController = require("../controllers/order_controller");
const router = express.Router();

router.get("/eggs", OrderController.index);
router.post("/eggs", OrderController.create);
router.get("/eggs/:id", OrderController.show);
router.put("/eggs/:id", OrderController.update);
router.delete("/eggs/:id", OrderController.delete);

module.exports = router;
