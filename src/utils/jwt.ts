import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import dotenv from 'dotenv'
dotenv.config();

/**
 * Sign a new token
 * @param user 
 * @param duration 
 * @returns 
 */
export const generateToken = async (user:object, duration:string) => jwt.sign(user, JWT_SECRET , {expiresIn: duration})

/**
 * Compare token
 * @param token 
 * @returns 
 */
export const compareToken = async(token:string) => jwt.verify(token, JWT_SECRET);
