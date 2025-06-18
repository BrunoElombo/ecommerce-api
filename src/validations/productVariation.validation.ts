import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import HTTP_STATUS from "../utils/http.utils";


/**
 * Create product validation
 */
export const createProductCategoryValidation = [
    body("name").notEmpty().withMessage("name is required"),
    body("value").notEmpty().withMessage("value is required"),
    body("type").notEmpty().contains(["SIZE", "COLOR", "COUNTRY"]).withMessage("value is required"),
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
