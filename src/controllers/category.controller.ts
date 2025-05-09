import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { createCategoryService, deleteCategoryService, getAllCategoriesService, updateCategoryService } from "../services/category.services";
import HTTP_STATUS from "../utils/http.utils";


/**
 * create category controller
 * @param req 
 * @param res 
 * @returns 
 */
export const createCategoryController = async (req:Request, res:Response) =>{
    try {
        let category = await createCategoryService(req.body);
        res
        .status(category.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(category);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Get categories controller
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllCategoriesController = async (req:Request, res:Response) =>{
    try {
        let categories = await getAllCategoriesService();
        res
        .status(categories.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(categories);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:``, field:''}]);
    }
}

/**
 * Update category controller
 * @param req 
 * @param res 
 * @returns 
 */
export const updateCategoryController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) return apiResponse(true, [{message:'id is required in params', field:"id"}]);
        let {body} = req;
        let category = await updateCategoryService(id, body);
        res
        .status(category.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(category);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete category controller
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteCategoryController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) return apiResponse(true, [{message:'id is required in params', field:"id"}]);
        let category = await deleteCategoryService(id);
        res
        .status(category.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(category);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}