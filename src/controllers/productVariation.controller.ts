import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreateProductVariationService, DeleteProductVariationService, GetAllProductVariationsService, GetProductVariationByIdService, UpdateProductVariationService } from "../services/productVariation.service";



export const CreateProductVariationController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let productVariation = await CreateProductVariationService(body);
        res
        .status(productVariation?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(productVariation);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllProductValidationsController = async (req:Request, res:Response) =>{
    try {
        let productVariations = await GetAllProductVariationsService();
        res
        .status(productVariations.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(productVariations);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetProductVariationByIdController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        let productVariation = await GetProductVariationByIdService(id);
        res
        .status(productVariation.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(productVariation);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdateProductVariationController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let productVariation = await UpdateProductVariationService(id, body);
        res
        .status(productVariation.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(productVariation)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeleteProductVariationController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let productVariation = await DeleteProductVariationService(id);
        res
        .status(productVariation.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(productVariation);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}