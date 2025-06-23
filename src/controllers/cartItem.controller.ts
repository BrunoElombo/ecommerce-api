import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreateCartItemService, DeleteCartItemService, GetCartItemByIdService, GetCartItemsBySKUService, GetOwnCartItemsService, UpdateCartItemService } from "../services/cartItem.service";



export const CreateCartItemController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let cartItem = await CreateCartItemService(body);
        res
        .status(cartItem?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(cartItem);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllCartItemsController = async (req:Request, res:Response) =>{
    try {
        let userId = "83aad496-84b0-488d-a620-563ad1469f39"
        let cartitems = await GetOwnCartItemsService(userId);
        res
        .status(cartitems.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(cartitems);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}

export const GetCartItemsBySKUController = async (req:Request, res:Response) =>{
    try {
        let {sku} = req.params;
        let cartitems = await GetCartItemsBySKUService(sku);
        res
        .status(cartitems.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(cartitems);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetCartItemByIdController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        let cartItem = await GetCartItemByIdService(id);
        res
        .status(cartItem.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(cartItem);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdateCartItemController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let cartItem = await UpdateCartItemService(id, body);
        res
        .status(cartItem.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(cartItem)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeleteCartItemController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let cartItem = await DeleteCartItemService(id);
        res
        .status(cartItem.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(cartItem);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}