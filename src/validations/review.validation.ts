import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import HTTP_STATUS from "../utils/http.utils";


/**
 * Create review validation
 */
export const CreateReviewValidation = [
    body("userId").notEmpty().withMessage("userId is required"),
    body("productId").notEmpty().withMessage("productId is required"),
    body("content").notEmpty().withMessage("content is required"),
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
