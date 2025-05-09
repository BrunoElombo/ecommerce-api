import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HTTP_STATUS from '../utils/http.utils';
import { apiResponse } from '../utils/apiResponse';


export const createCartItemValidation = [
    body("userId").notEmpty().isUUID().withMessage("userId is required"),
    body("productId").notEmpty().isUUID().withMessage("productId is required"),
    body("quantity").optional().isInt().notEmpty().withMessage("invalid quantity"),
    (req:Request, res:Response, next:NextFunction) =>{
        let errors = validationResult(req);
        if(errors.array()){
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send({error:true, errors});
            return;
        }
        next();
    }
]


export const updateCartItemValidation = [
    body("userId").optional().notEmpty().isUUID().withMessage("userId is required"),
    body("productId").optional().notEmpty().withMessage("productId is required"),
    body("quantity").optional().notEmpty().withMessage("invalid quantity"),
    (req:Request, res:Response, next:NextFunction) =>{
        let errors = validationResult(req);
        if(errors.array()){
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send({error:true, errors});
            return;
        }
        next();
    }
]