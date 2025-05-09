import { Router, RequestHandler } from "express";
import { createProductVariationController, deleteProductVariationController, updateProductVariationController } from "../controllers/productVariation.controller";
import { createProductVariationValidation, updateProductVariationValidation } from '../validations/productVariation.validations';


const routes = Router();

routes.post("/", createProductVariationValidation, createProductVariationController as RequestHandler);
routes.patch("/:id", updateProductVariationValidation, updateProductVariationController as RequestHandler);
routes.delete("/:id", deleteProductVariationController as RequestHandler);


export default routes;