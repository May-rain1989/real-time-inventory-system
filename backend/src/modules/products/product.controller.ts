import type { Request, Response, NextFunction } from "express";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.schemas";
import { ProductService } from "./product.service";

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createProductSchema.parse(req.body);
      const product = await ProductService.createProduct(data);

      return res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProducts(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const products = await ProductService.getProducts();

      return res.status(200).json({
        products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product = await ProductService.getProductById(req.params.id);

      return res.status(200).json({
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = updateProductSchema.parse(req.body);
      const product = await ProductService.updateProduct(req.params.id, data);

      return res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await ProductService.deleteProduct(req.params.id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}