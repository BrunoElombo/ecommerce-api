import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import HTTP_STATUS from "../utils/http.utils";


/**
 * Create payment
 */
export const CreatePaymentValidation = [
    body("userId").notEmpty().withMessage("userId is required"),
    body("status").notEmpty().withMessage("status is required"),
    body("paymenMethod").notEmpty().withMessage("paymenMethod is required"),
    (req:Request, res:Response, next:NextFunction) =>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send({
                "error": true,
                "errors": error.array()
            });
            return;
        } 
        next();
    }
]