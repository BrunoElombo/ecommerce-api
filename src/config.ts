import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const prisma = new PrismaClient();
export const SALT = 10;
export const JWT_SECRET = process.env.JWT_SECRET || "JWT-SECRET-CODE";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "JWT-SECRET-CODE";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "JWT-SECRET-CODE";
export const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "JWT-SECRET-CODE";

export const USERS_API = process.env.USERS_API;
export const FRONT_ADDRESS = process.env.FRONT_ADDRESS;
export const ENTERPRISE_API = process.env.ENTERPRISE_API;
export const BUDGET_API = process.env.BUDGET_API;
export const BILLING_API = process.env.BILLING_API;

export const googleClient = new OAuth2Client(
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI
)


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
