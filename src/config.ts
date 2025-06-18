import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const prisma = new PrismaClient();
export const SALT = 15;
export const JWT_SECRET = process.env.JWT_SECRET || "SUPER-SECRET";
export const ADDRESS = process.env.ADDRESS;



export const HOST = process.env.HOST;
export const HOST_USER = process.env.HOST_USER;
export const HOST_PASSWORD = process.env.HOST_PASSWORD;
export const transporter = nodemailer.createTransport({
    host: HOST,
    port: 587,
    secure: false,
    auth: {
      user: HOST_USER,
      pass: HOST_PASSWORD,
    },
});
