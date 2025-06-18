import { Request, Response } from "express";
import HTTP_STATUS from "../utils/http.utils";
import { apiResponse } from "../utils/errors.utils";
import { CreateReviewService, DeleteReviewService, GetAllReviewsService, GetReviewByProductIdService, UpdateReviewService } from "../services/review.service";


export const CreateReviewController = async (req:Request, res:Response) =>{
    try {
        let {body} = req;
        let review = await CreateReviewService(body);
        res
        .status(review?.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.CREATED.statusCode)
        .send(review);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetAllReviewsController = async (req:Request, res:Response) =>{
    try {
        let reviews = await GetAllReviewsService();
        res
        .status(reviews.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(reviews);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const GetReviewByproductIdController = async (req:Request, res:Response) =>{
    try {
        let {productId} = req.params;
        let reviews = await GetReviewByProductIdService(productId);
        res
        .status(reviews.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.OK.statusCode)
        .send(reviews);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const UpdateReviewController = async (req:Request, res:Response) =>{
    try {
        let {params, body} = req;
        let {id} = params
        let review = await UpdateReviewService(id, body);
        res
        .status(review.error ? HTTP_STATUS.BAD_REQUEST.statusCode : HTTP_STATUS.OK.statusCode)
        .send(review)
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}


export const DeleteReviewController = async (req:Request, res:Response) => {
    try {
        let {id} = req.params;
        let review = await DeleteReviewService(id);
        res
        .status(review.error ? HTTP_STATUS.NOT_FOUND.statusCode : HTTP_STATUS.NO_CONTENT.statusCode)
        .send(review);
    } catch (error) {
        console.log(error);
        res
        .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
        .send(apiResponse(true, [{msg:`${error}`, field:"server"}]))
    }
}