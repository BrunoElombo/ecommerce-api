import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../services/product.services";
import HTTP_STATUS from "../utils/http.utils";


/**
 * create product controller
 * @param req 
 * @param res 
 * @returns 
 */
export const createProductController = async (req:Request, res:Response) =>{
    try {
        let product = await createProductService(req.body);
        res
        .status(product.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(product);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Get products controller
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllProductsController = async (req:Request, res:Response) =>{
    try {
        let products = await getAllProductsService();
        res
        .status(products.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(products);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:''}]);
    }
}

/**
 * Get products controller
 * @param req 
 * @param res 
 * @returns 
 */
export const getProductByIdController = async (req:Request, res:Response)=>{
    try {
        let {id} = req.params
        let products = await getProductByIdService(id);
        res
        .status(products.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(products);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Update product controller
 * @param req 
 * @param res 
 * @returns 
 */
export const updateProductController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) return apiResponse(true, [{message:'id is required in params', field:"id"}]);
        let {body} = req;
        let product = await updateProductService(id, body);
        res
        .status(product.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(product);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete product controller
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteProductController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send(apiResponse(true, [{message:'id is required in params', field:"id"}]));
        let product = await deleteProductService(id);
        res
        .status(product.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(product);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}