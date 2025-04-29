import { Request, Response } from "express";
import { createUserService, getuserByIdService, getAllUsersService, updateUserService, deleteUserService } from "../services/user.services";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/apiResponse";

/**
 * Returns the user created or an error
 * @param req 
 * @param res 
 * @returns 
 */
export const createUserController = async (req:Request, res:Response)=>{
    try {
        let {body} = req;
        let user = await createUserService(body);
        res
        .status(user.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(user);
        return;
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{message:`${error}`, field:'server'}]));;
    }
}

/**
 * Return a user by Id or an error
 * @param req 
 * @param res 
 */
export const getUserByIdController = async(req:Request, res:Response) =>{
    try {
        let {id} = req.params;

        let user = await getuserByIdService(id);
        res
        .status(user.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(user);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{message:`${error}`, field:'server'}]));
    }
}


/**
 * Returns connect user's profile or and error
 * @param req 
 * @param res 
 */
export const getMyProfileController = async(req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        let user = await getuserByIdService(id);
        res
        .status(user.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(user);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{message:`${error}`, field:'server'}]));
    }
}

/**
 * Returns all users or an error
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllUsersController = async(req:Request, res:Response) =>{
    try {
        let users = await getAllUsersService();
        res
        .status(users.error?HTTP_STATUS.BAD_REQUEST.statusCode:HTTP_STATUS.OK.statusCode)
        .send(users);
        return;
    } catch (error) {
        console.log(error);
        res.status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{
            message: `${error}`,
            field:'server'
        }]))
    }
}


/**
 * Returns updated user or error
 * @param req 
 * @param res 
 */
export const updateUsersController = async(req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) res.status(HTTP_STATUS.NOT_FOUND.statusCode).send(apiResponse(true, [{
            message:'User not found',
            field:'id'
        }]))
        let user = await updateUserService(id, req.body);
        res
        .status(user.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(user)
    } catch (error) {
        console.log(error);
        res.status(HTTP_STATUS.SERVEUR_ERROR.statusCode).send(apiResponse(true, [{
            message:`${error}`,
            field:'server'
        }]))
    }
}


/**
 * Returns the deleted user or error
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteUserController = async(req:Request, res:Response) =>{
    try {
        let {id} = req.params;
        if(!id) {
            res
            .status(HTTP_STATUS.NOT_FOUND.statusCode)
            .send(apiResponse(true, [{
                message:"Not found",
                field:"id"
            }]));
            return;
        }
        let user = await deleteUserService(id);
        res
        .status(user?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(user);
        return
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{
            message:`${error}`,
            field:'server'
        }]))
        return
    }
}