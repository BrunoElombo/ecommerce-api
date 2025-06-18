import { DeleteProductVariationController, GetProductVariationByIdController, UpdateProductVariationController } from './../controllers/productVariation.controller';
import { CreateProductVariationController, GetAllProductValidationsController } from '../controllers/productVariation.controller';
import { createProductValidation } from '../validations/product.validations';
import { createProductCategoryValidation } from '../validations/ProductCategory.validation';
import { Router } from "express";

const route = Router();

route.get('/', GetAllProductValidationsController);
route.post('/', createProductValidation, CreateProductVariationController);
route.get('/:id', GetProductVariationByIdController);
route.patch('/:id', UpdateProductVariationController);
route.delete('/:id', DeleteProductVariationController);

export default route;