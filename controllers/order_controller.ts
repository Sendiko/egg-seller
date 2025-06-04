// @ts-nocheck
import { Request, Response } from "express";
import Order from "../models/order";

const OrderController = {
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const orders = await Order.findAll();
      return res.status(200).json({
        status: 200,
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        error: "Failed to fetch orders",
      });
    }
  },
  show: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const orderToShow = await Order.findByPk(id);
      if (!orderToShow) {
        return res.status(404).json({
          status: 404,
          error: "Order not found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Order fetched successfully",
        data: orderToShow,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        error: "Failed to fetch order",
      });
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Image file is required",
        });
      }
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${baseUrl}/public/eggs/${req.file.filename}`;
      const newOrder = await Order.create({
        ...req.body,
        eggImage: imageUrl,
      });

      return res.status(201).json({
        status: 201,
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        error: "Failed to create order",
      });
    }
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const orderToUpdate = await Order.findByPk(req.params.id);
      if (!orderToUpdate) {
        return res.status(404).json({
          status: 404,
          error: "Order not found",
        });
      }

      let imageUrl = orderToUpdate.eggImage;
      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const imageUrl = `${baseUrl}/public/eggs/${req.file.filename}`;
        req.body.eggImage = imageUrl;
      }

      await orderToUpdate.update({
        custoemrName: req.body.customerName ?? orderToUpdate.customerName,
        customerAddress:
          req.body.customerAddress ?? orderToUpdate.customerAddress,
        purchaseType: req.body.purchaseType ?? orderToUpdate.purchaseType,
        amount: req.body.amount ?? orderToUpdate.amount,
        total: req.body.total ?? orderToUpdate.total,
        eggImage: req.body.eggImage || imageUrl,
      });
      return res.status(200).json({
        status: 200,
        message: "Order updated successfully",
        data: orderToUpdate,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        error: "Failed to update order",
      });
    }
  },

  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const orderToDelete = await Order.findByPk(id);
      if (!orderToDelete) {
        return res.status(404).json({
          status: 404,
          error: "Order not found",
        });
      }
      await orderToDelete.destroy();
      return res.status(200).json({
        status: 200,
        message: "Order deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        error: "Failed to delete order",
      });
    }
  },
};

export default OrderController;
