import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreatePaymentService, DeletePaymentService, GetAllPaymentsService, GetPaymentByIdService, UpdatePaymentService } from "../services/payment.service";


export const CreatePaymentController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let payment = await CreatePaymentService(body);
        res
        .status(payment?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(payment);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllPaymentsController = async (req:Request, res:Response) =>{
    try {
        let payments = await GetAllPaymentsService();
        res
        .status(payments.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(payments);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetPaymentByIdController = async (req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        let payment = await GetPaymentByIdService(id);
        res
        .status(payment.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(payment);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdatePaymentController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let payment = await UpdatePaymentService(id, body);
        res
        .status(payment.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(payment)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeletePaymentController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let payment = await DeletePaymentService(id);
        res
        .status(payment.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(payment);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}