import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { createProductVariationService, deleteProductVariationService, updateProductVariationService } from "../services/productVariation.services";
import HTTP_STATUS from "../utils/http.utils";


/**
 * create product variation controller
 * @param req 
 * @param res 
 * @returns 
 */
export const createProductVariationController = async (req:Request, res:Response) =>{
    try {
        let variation = await createProductVariationService(req.body);
        res
        .status(variation.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(variation);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Update product variation controller
 * @param req 
 * @param res 
 * @returns 
 */
export const updateProductVariationController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) return apiResponse(true, [{message:'id is required in params', field:"id"}]);
        let {body} = req;
        let variation = await updateProductVariationService(id, body);
        res
        .status(variation.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(variation);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete product variation controller
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteProductVariationController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send(apiResponse(true, [{message:'id is required in params', field:"id"}]));
        let variation = await deleteProductVariationService(id);
        res
        .status(variation.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(variation);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}