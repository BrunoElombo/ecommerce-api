import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import HTTP_STATUS from "../utils/http.utils";


/**
 * Create address validation
 */
export const CreateAddressValidation = [
    body("userId").notEmpty().withMessage("userId is required"),
    body("street").notEmpty().withMessage("street is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("state").notEmpty().withMessage("state is required"),
    body("postalCode").notEmpty().withMessage("postalCode is required"),
    body("line1").notEmpty().withMessage("line1 is required"),
    body("line2").notEmpty().optional().withMessage("line2 is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("countryCode").notEmpty().withMessage("countryCode is required"),
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