import { CreateCategoryValidation } from './../validations/category.validation';
import { Router } from "express";
import { CreateCategoryController, DeleteCategoryController, GetAllCategoriesController, GetCategoryByIdController, UpdateCategoryController } from "../controllers/category.controller";

const route = Router();

route.get('/', GetAllCategoriesController)
route.post('/', CreateCategoryValidation, CreateCategoryController)
route.get('/:id', GetCategoryByIdController)
route.patch('/:id', UpdateCategoryController)
route.delete('/:id', DeleteCategoryController)

export default route;