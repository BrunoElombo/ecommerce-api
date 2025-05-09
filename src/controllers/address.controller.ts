import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { createAddressService, deleteOwnAddressService, getOwnAddressService, updateOwnAddressService } from "../services/address.services";
import HTTP_STATUS from "../utils/http.utils";


/**
 * create own address constroller
 * @param req 
 * @param res 
 * @returns 
 */
export const createAddressController = async (req:Request, res:Response) =>{
    try {
        let address = await createAddressService(req.body);
        res
        .status(address.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(address);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Get own address controller
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllOwnAddressController = async (req:Request, res:Response) =>{
    try {
        let {authorization} = req.headers;
        let token = authorization?.split(" ")[1];
        let address = await getOwnAddressService(token);
        res
        .status(address.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(address);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:``, field:''}]);
    }
}

/**
 * Update own addresscontroller
 * @param req 
 * @param res 
 * @returns 
 */
export const updateOwnAddressController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) return apiResponse(true, [{message:'id is required in params', field:"id"}]);
        let {body} = req;
        let {authorization} = req.headers;
        let token = authorization?.split(" ")[1];
        let address = await updateOwnAddressService(token, id, body);
        res
        .status(address.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(address);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete own address controller
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteOwnAddressController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) return apiResponse(true, [{message:'id is required in params', field:"id"}]);
        let {authorization} = req.headers;
        let token = authorization?.split(" ")[1];
        let address = await deleteOwnAddressService(token, id);
        res
        .status(address.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(address);
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}