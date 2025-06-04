// @ts-nocheck
import express, { Router, Request, Response } from "express";
import OrderController from "../controllers/order_controller";
import upload from "../middleware/upload";

const router: Router = express.Router();

router.get("/eggs", OrderController.index);
router.get("/eggs/:id", OrderController.show);
router.post("/eggs", upload.single("image"), OrderController.create);
router.put("/eggs/:id", upload.single("image"), OrderController.update);
router.delete("/eggs/:id", OrderController.delete);

export default router;
