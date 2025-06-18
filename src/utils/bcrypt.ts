import { SALT } from './../config';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


/**
 * Hash user password
 * @param password 
 * @returns 
 */

export const hashPassword = async (password:string) => await bcrypt.hash(password, SALT)

/**
 * Compare hash password to user password
 * @param password 
 * @param userPassword 
 * @returns 
 */
export const comparePassword = async (password:string, userPassword:string) => await bcrypt.compare(password, userPassword);