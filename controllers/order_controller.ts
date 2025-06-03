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

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const newOrder = await Order.create(req.body);
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

  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const orderToUpdate = await Order.findByPk(req.params.id);
      if (!orderToUpdate) {
        return res.status(404).json({
          status: 404,
          error: "Order not found",
        });
      }
      await orderToUpdate.update(req.body);
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
