import { Request, Response } from "express";
import { apiResponse } from "../utils/errors.utils";
import { CreateProductService, DeleteProductService, GetAllProductsService, GetProductBySlugService, UpdateProductService } from "../services/product.service";
import HTTP_STATUS from "../utils/http.utils";


/**
 * Create Product
 * @param req Request
 * @param res Response
 * @returns
 */
export const CreateProductController = async(req:Request, res:Response) =>{
    try {
        let product = await CreateProductService(req.body);
        res
        .status(product.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(product);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}]);
    }
}

/**
 * Get product by id
 * @param req Request
 * @param res Response
 * @returns 
 */
export const GetProductBySlugController = async(req:Request, res:Response) =>{
    try {
        let{slug} =req.params;
        let product = await GetProductBySlugService(slug);
        res
        .status(product.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(product)
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}]);
    }
}

/**
 * Get all products
 * @param req Request
 * @param res Response
 * @returns 
 */
export const GetAllProductsController = async(req:Request, res:Response) =>{
    try {
        let products = await GetAllProductsService();
        res
        .status(products.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(products);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}]);
    }
}

/**
 * Update product
 * @param req Request
 * @param res Response
 */
export const UpdateProductController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {slug} = params;
        let product = await UpdateProductService(slug, body);
        res
        .status(product.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(product);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Delete product
 * @param req Request
 * @param res Response
 */
export const DeleteProductController = async (req:Request, res:Response)=>{
    try {
        let {id} = req.params
        let product = await DeleteProductService(id);
        res
        .status(product.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(product)
    } catch (error) {
        console.log(error);
    }
}


export const Search = async(req:Request, res:Response) =>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}


/**
 * Filter products
 * @param req Request
 * @param res Response
 * @returns 
 */
// export const FilterProductsController = async(req:Request, res:Response) =>{
//     try {
//         let {filter, value} = req.query;
//         if(filter && value){
//             let products = await FilterProductService(filter.toString(), value.toString());
//             res
//             .status(products.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
//             .send(products);
//             return;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }