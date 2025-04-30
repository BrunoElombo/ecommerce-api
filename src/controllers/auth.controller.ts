import { Request, Response } from "express"
import { loginUserService, logoutService, RegisterUserService } from "../services/auth.services";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/apiResponse";

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
        
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}])
    }
}