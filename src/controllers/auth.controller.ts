import { Request, Response } from "express"
import { forgotPasswordService, loginUserService, logoutService, newPasswordService, refreshTokenService, RegisterUserService } from "../services/auth.services";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/apiResponse";
import { FRONT_ADDRESS, HOST_USER, transporter } from "../config";

export const loginUserController = async(req:Request, res:Response) =>{
    try {
        let {username, password} = req.body
        let login = await loginUserService(username, password);
        if(login.error){
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send(login)
            return
        }
        let {access, refresh} = login.data
        res.cookie('refresh', refresh, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure:true, sameSite:'none' });
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(apiResponse(false, undefined, {access}));
        return;
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

export const logoutController =async(req:Request, res:Response)=>{
    try {
        let {refresh} = req.cookies
        let user = await logoutService(refresh);
        res.clearCookie('refresh', {httpOnly:true, sameSite:'none', secure:true});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}])
    }
}

export const registerUserController = async(req:Request, res:Response) =>{
    try {
        let {email} = req.body
        let token = await RegisterUserService(req.body);
        
        if(token.error) {
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send(token);
            return;
        }

        let{verificationToken} = token?.data;

        let sendMail = await transporter.sendMail(
            {
                from: `${HOST_USER}`,
                to: email,
                subject: "Verify user account",
                text: `This verification token is valid for 5 minutes \n link: ${FRONT_ADDRESS}/?token=${verificationToken}`,
                // html: "<b>Hello world?</b>",
            }
        )
        if(!sendMail) return res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send(apiResponse(true, [{message:'failed to send verification mail', field:'email'}]));

        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(apiResponse(false, undefined, {link:`${FRONT_ADDRESS}/?token=${verificationToken}`}))
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}])
    }
}

export const forgotPasswordController = async (req:Request, res:Response) =>{
    try {
        let {email} = req.body;
        
        let response = await forgotPasswordService(email);

        let sendMail = await transporter.sendMail(
            {
                from: `${HOST_USER}`,
                to: email,
                subject: "Verify user account",
                text: `${response.data}`,
                // html: "<b>Hello world?</b>",
            }
        )
        if(!sendMail) return res.status(HTTP_STATUS.BAD_REQUEST.statusCode).send(apiResponse(true, [{message:'failed to send verification mail', field:'email'}]));
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{
            message:`${error}`,
            field:'server'
        }]))
    }
}

export const newPasswordController =async (req:Request, res:Response) =>{
    try {
        let token = req.query.token as string;
        let {password} = req.body;

        if(!token) {
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send(apiResponse(true, [{message:'token not found', field:'token'}]));
            return;
        }

        let user = await newPasswordService(token, password);
        res
        .status(user?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(user);
        return;
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{
            message:`${error}`,
            field:'server'
        }]))
    }
}

export const refreshTokenController =async (req:Request, res:Response) =>{
    try {
        let token = req.query.token as string;
        
        if(!token) {
            res
            .status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send(apiResponse(true, [{message:'token not found', field:'token'}]));
            return;
        }

        let user = await refreshTokenService(token);
        res
        .status(user?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(user);
        return;
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{
            message:`${error}`,
            field:'server'
        }]))
    }
}