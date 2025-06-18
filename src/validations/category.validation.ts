import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import HTTP_STATUS from "../utils/http.utils";


/**
 * Create category validation
 */
export const CreateCategoryValidation = [
    body("name").notEmpty().withMessage("name is required"),
    body("price").notEmpty().isNumeric().withMessage("price is required"),
    body("slug").notEmpty().optional().trim().withMessage("slug should not be empty"),
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
