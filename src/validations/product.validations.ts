import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HTTP_STATUS from '../utils/http.utils';


export const createProductValidation = [
    body("title").notEmpty().withMessage("title is required"),
    body("slug").notEmpty().withMessage("slug is required"),
    body("description").optional().notEmpty().withMessage("description is required"),
    body("price").optional().notEmpty().withMessage("price is required"),
    body("stock").optional().notEmpty().withMessage("stock is required"),
    body("categoryId").notEmpty().withMessage("categoryId is required"),
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


export const updateProductValidation = [
    
    body("name").optional().notEmpty().withMessage("name is required"),
    body("slug").optional().notEmpty().withMessage("slug is required"),
    body("description").optional().notEmpty().withMessage("description is required"),
    body("price").optional().notEmpty().withMessage("price is required"),
    body("stock").optional().notEmpty().withMessage("stock is required"),
    body("categoryId").optional().notEmpty().withMessage("categoryId is required"),
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