import type { Request, Response, NextFunction } from "express";
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from "./warehouse.schemas";
import { WarehouseService } from "./warehouse.service";

export class WarehouseController {
  static async createWarehouse(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = createWarehouseSchema.parse(req.body);
      const warehouse = await WarehouseService.createWarehouse(data);

      return res.status(201).json({
        message: "Warehouse created successfully",
        warehouse,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getWarehouses(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const warehouses = await WarehouseService.getWarehouses();

      return res.status(200).json({
        warehouses,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getWarehouseById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const warehouse = await WarehouseService.getWarehouseById(req.params.id);

      return res.status(200).json({
        warehouse,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateWarehouse(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = updateWarehouseSchema.parse(req.body);
      const warehouse = await WarehouseService.updateWarehouse(req.params.id, data);

      return res.status(200).json({
        message: "Warehouse updated successfully",
        warehouse,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWarehouse(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await WarehouseService.deleteWarehouse(req.params.id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}