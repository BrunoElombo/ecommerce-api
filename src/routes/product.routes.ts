import { RequestHandler, Router } from "express";
import { CreateProductController, DeleteProductController, GetAllProductsController, GetProductBySlugController, UpdateProductController } from "../controllers/product.controller";
import { createProductValidation } from "../validations/product.validations";

const route = Router();


route.get('/', GetAllProductsController as RequestHandler);
route.post('/', createProductValidation, CreateProductController as RequestHandler);
route.get('/:slug', GetProductBySlugController as RequestHandler);
route.patch("/:slug", UpdateProductController as RequestHandler);
route.delete("/:id", DeleteProductController as RequestHandler);
// route.get("/filter", FilterProductsController as RequestHandler);


export default route;