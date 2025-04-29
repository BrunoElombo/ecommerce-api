import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import HTTP_STATUS from '../utils/http.utils';

export const createUserValidation = [
    body("email").notEmpty().isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
    body("username").notEmpty().isAlphanumeric().withMessage("Username is required"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("phone").notEmpty().isAlphanumeric().withMessage("Invalid phone number"),
    (req: Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send({success:false, errors:errors.array()});
          return
        }
        next();
      }
];


export const updateUserValidation = [
  body("email").notEmpty().optional().isEmail().withMessage("Invalid email"),
  body("password").notEmpty().optional().withMessage("Invalid password"),
  body("username").notEmpty().optional().withMessage("Invalid username"),
  body("firstName").notEmpty().optional().withMessage("Invalid firstname"),
  body("lastName").notEmpty().optional().withMessage("Invalid lastname"),
  body("phone").notEmpty().optional().isNumeric().withMessage("Invalidhone number"),
  (req: Request, res:Response, next:NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send({success:false, errors:errors.array()});
        return
      }
      next();
    }
];
