import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HTTP_STATUS from '../utils/http.utils';


export const createCategoryValidation = [
    body("name").notEmpty().withMessage("name is required"),
    body("slug").notEmpty().withMessage("slug is required"),
    body("description").optional().notEmpty().withMessage("description is required"),
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


export const updateCategoryValidation = [
    
    body("name").optional().notEmpty().withMessage("name is required"),
    body("slug").optional().notEmpty().withMessage("slug is required"),
    body("description").optional().notEmpty().withMessage("description is required"),
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