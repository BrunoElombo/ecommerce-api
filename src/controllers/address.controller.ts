import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreateAddressService, DeleteAddressService, GetAddressByIdService, GetAllAddressesService, UpdateAddressService } from "../services/address.service";



export const CreateAddressController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let address = await CreateAddressService(body);
        res
        .status(address?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(address);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllAddressesController = async (req:Request, res:Response) =>{
    try {
        let addresses = await GetAllAddressesService();
        res
        .status(addresses.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(addresses);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAddressByIdController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        let address = await GetAddressByIdService(id);
        res
        .status(address.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(address);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdateAddressController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let address = await UpdateAddressService(id, body);
        res
        .status(address.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(address)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeleteAddressController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let address = await DeleteAddressService(id);
        res
        .status(address.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(address);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}