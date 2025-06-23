import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreatePaymentService, DeletePaymentService, GetAllPaymentsService, GetPaymentByIdService, UpdatePaymentService } from "../services/payment.service";
import { createStripeCheckoutSession } from '../services/checkout.service';


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

export const CreateStripeCheckoutSessionController = async (req: Request, res: Response) => {
    try {
        const { cartItems, userEmail } = req.body;
        const result = await createStripeCheckoutSession(cartItems, userEmail);
        res.status(result.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode).send(result);
    } catch (error) {
        console.log(error);
        res.status(HTTP_STATUS.SERVEUR_ERROR.statusCode).send(apiResponse(true, [{msg:`${error}`, field:"server"}]));
    }
}

// export const GetMeController = async (req: Request, res: Response) => {
//     try {
//         // req.user is set by auth middleware
//         if (!req.user) {
//             return res.status(HTTP_STATUS.UN_AUTHORIZED.statusCode).json({ error: 'Unauthorized' });
//         }
//         // Only return safe fields
//         const { id, email, firstName, lastName } = req.user;
//         res.status(HTTP_STATUS.OK.statusCode).json({ id, email, firstName, lastName });
//     } catch (error) {
//         console.log(error);
//         res.status(HTTP_STATUS.SERVEUR_ERROR.statusCode).json({ error: 'Server error' });
//     }
// }