import { DeleteRatingService, GetRatingByProductIdService, UpdateRatingService } from './../services/rating.service';
import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreateRatingService, GetAllRatingsService } from "../services/rating.service";


export const CreateRatingController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let rating = await CreateRatingService(body);
        res
        .status(rating?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(rating);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllRatingsController = async (req:Request, res:Response) =>{
    try {
        let ratings = await GetAllRatingsService();
        res
        .status(ratings.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(ratings);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetRatingByproductIdController = async (req:Request, res:Response) =>{
    try {
        let {productId} = req.params;
        let ratings = await GetRatingByProductIdService(productId);
        res
        .status(ratings.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(ratings);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdateRatingController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let rating = await UpdateRatingService(id, body);
        res
        .status(rating.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(rating)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeleteRatingController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let rating = await DeleteRatingService(id);
        res
        .status(rating.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(rating);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}