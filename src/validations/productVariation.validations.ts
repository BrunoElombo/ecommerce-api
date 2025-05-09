import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HTTP_STATUS from '../utils/http.utils';

const varaitions = [
    "SIZE",
    "COLOR",
    "MATERIAL"
]

export const createProductVariationValidation = [
    body("variation").notEmpty().isIn(varaitions).withMessage("invalid variation"),
    body("value").notEmpty().withMessage("value is required"),
    body("productId").notEmpty().withMessage("productId is required"),
    body("additionalPrice").optional().notEmpty().withMessage("additionalPrice is required"),
    (req:Request, res:Response, next:NextFunction) =>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send({error:true, errors});
            return;
        }
        next();
    }
]


export const updateProductVariationValidation = [
    body("variationId").optional().notEmpty().isIn(varaitions).withMessage("invalid variation"),
    body("value").optional().notEmpty().withMessage("value should not be left empty"),
    body("productId").optional().notEmpty().withMessage("productId should not be left empty"),
    body("additionalPrice").optional().notEmpty().withMessage("additionalPric should not be left empty"),
    (req:Request, res:Response, next:NextFunction) =>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send({error:true, errors});
            return;
        }
        next();
    }
]