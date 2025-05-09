import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HTTP_STATUS from '../utils/http.utils';
import { apiResponse } from '../utils/apiResponse';


export const createAddressValidation = [
    body("userId").notEmpty().isUUID().withMessage("userId is required"),
    body("line1").notEmpty().withMessage("line1 is required"),
    body("line2").optional().notEmpty().withMessage("line2 should not be left empty"),
    body("city").notEmpty().withMessage("city is required"),
    body("state").notEmpty().withMessage("state is required"),
    body("postalCode").notEmpty().withMessage("postalCode is required"),
    body("country").notEmpty().withMessage("country is required"),
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


export const updateAddressValidation = [
    body("userId").optional().notEmpty().isUUID().withMessage("userId is required"),
    body("line1").optional().notEmpty().withMessage("line1 is required"),
    body("line2").optional().notEmpty().withMessage("line2 should not be left empty"),
    body("city").optional().notEmpty().withMessage("city is required"),
    body("state").optional().notEmpty().withMessage("state is required"),
    body("postalCode").optional().notEmpty().withMessage("postalCode is required"),
    body("country").optional().notEmpty().withMessage("country is required"),
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