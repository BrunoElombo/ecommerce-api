import { CreateProductCategoryController, DeleteProductCategoryController, GetAllProductCategoriesController, GetProductCategoryByIdController, UpdateProductCategoryController } from '../controllers/productCategory.controller';
import { createProductCategoryValidation } from '../validations/ProductCategory.validation';
import { Router } from "express";

const route = Router();

route.get('/', GetAllProductCategoriesController);
route.post('/', createProductCategoryValidation, CreateProductCategoryController);
route.get('/:id', GetProductCategoryByIdController)
route.patch('/:id', UpdateProductCategoryController)
route.delete('/:id', DeleteProductCategoryController)

export default route;