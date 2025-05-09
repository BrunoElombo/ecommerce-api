import { Router, RequestHandler } from "express";
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController } from "../controllers/product.controllers";
import { createProductValidation, updateProductValidation } from '../validations/product.validations';


const routes = Router();


routes.get("/", getAllProductsController as RequestHandler);
routes.get("/:id", getProductByIdController as RequestHandler);
routes.post("/", createProductValidation, createProductController as RequestHandler);
routes.patch("/:id", updateProductValidation, updateProductController as RequestHandler);
routes.delete("/:id", deleteProductController as RequestHandler);


export default routes;