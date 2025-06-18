import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreateCategoryService, DeleteCategoryService, GetAllCategoriesService, GetCategoryByIdService, UpdateCategoryService } from "../services/category.service";



export const CreateCategoryController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let category = await CreateCategoryService(body);
        res
        .status(category.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(category);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllCategoriesController = async (req:Request, res:Response) =>{
    try {
        let categories = await GetAllCategoriesService();
        res
        .status(categories.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(categories);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetCategoryByIdController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        let category = await GetCategoryByIdService(id);
        res
        .status(category.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(category);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdateCategoryController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let category = await UpdateCategoryService(id, body);
        res
        .status(category.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(category)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeleteCategoryController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let category = await DeleteCategoryService(id);
        res
        .status(category.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(category);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}