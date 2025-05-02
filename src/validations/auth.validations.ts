import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { body, validationResult } from "express-validator";



/**
 * Registration verifiaction
 */
export const registrationValidation=[
    body("email").notEmpty().isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
    body("username").notEmpty().isAlphanumeric().withMessage("Username is required"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    (req: Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send({success:false, errors:errors.array()});
          return
        }
        next();
      }
]


/**
 * Login verfication
 */
export const loginValidation=[
    body("username").notEmpty().withMessage("username or email required"),
    body("password").notEmpty().withMessage("password is required"),
    (req:Request, res:Response, next:NextFunction)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send({success:false, errors:errors.array()});
            return
        }
        next();
    }
]


/**
 * Forgot password
 */
export const forgotPasswordValidation=[
    body("email").notEmpty().isEmail().withMessage("invalid email"),
    (req:Request, res:Response, next:NextFunction)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send({success:false, errors:errors.array()});
            return
        }
        next();
    }
]