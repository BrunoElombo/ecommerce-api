import { Router, RequestHandler } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, updateCategoryController } from "../controllers/category.controller";
import { createCategoryValidation, updateCategoryValidation } from '../validations/category.validations';


const routes = Router();


routes.get("/", getAllCategoriesController as RequestHandler);
routes.post("/", createCategoryValidation, createCategoryController as RequestHandler);
routes.patch("/:id", updateCategoryValidation, updateCategoryController as RequestHandler);
routes.delete("/:id", deleteCategoryController as RequestHandler);


export default routes;