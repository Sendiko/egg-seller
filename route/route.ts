// @ts-nocheck
import express, { Router, Request, Response } from "express";
import OrderController from "../controllers/order_controller";

const router: Router = express.Router();

router.get("/eggs", OrderController.index);
router.post("/eggs", OrderController.create);
router.get("/eggs/:id", OrderController.show);
router.put("/eggs/:id", OrderController.update);
router.delete("/eggs/:id", OrderController.delete);

export default router;
