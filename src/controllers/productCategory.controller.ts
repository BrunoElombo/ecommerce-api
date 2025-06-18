import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreateProductCategoryService, DeleteProductCategoryService, GetAllProductCategoriesService, GetProductCategoryByIdService, UpdateProductCategoryService } from "../services/productCategory.service";



export const CreateProductCategoryController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let productCategory = await CreateProductCategoryService(body);
        res
        .status(productCategory?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(productCategory);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllProductCategoriesController = async (req:Request, res:Response) =>{
    try {
        let productCategories = await GetAllProductCategoriesService();
        res
        .status(productCategories.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(productCategories);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetProductCategoryByIdController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        let productCategory = await GetProductCategoryByIdService(id);
        res
        .status(productCategory.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(productCategory);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdateProductCategoryController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let productCategory = await UpdateProductCategoryService(id, body);
        res
        .status(productCategory.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(productCategory)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeleteProductCategoryController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let productCategory = await DeleteProductCategoryService(id);
        res
        .status(productCategory.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(productCategory);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}