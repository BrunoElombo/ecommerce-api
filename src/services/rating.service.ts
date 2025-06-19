import { prisma } from "../config";
import { Review } from "../types/types";
import { apiResponse } from "../utils/errors.utils";


/**
 * Create a new rating
 * @param body 
 * @returns Rating
 */
export const CreateRatingService = async (body:Review)=>{
    try {
        
        let rating = await prisma.rating.create({
            data:{...body}
        })

        if(rating) return apiResponse(false, undefined, rating);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Get a rating from product id
 * @param id 
 * @returns Ratings
 */
export const GetRatingByProductIdService = async (id:string) =>{
    try {
        let ratings = await prisma.rating.findMany({
            where:{productId: id}
        });
        return apiResponse(false, undefined, ratings);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all rating
 * @returns Ratings[]
 */
export const GetAllRatingsService = async () =>{
    try {
        let ratings = await prisma.review.findMany({
            include:{
                product:true
            }
        });
        return apiResponse(false, undefined, ratings);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Update rating
 * @param id 
 * @param body 
 * @returns Ratings
 */
export const UpdateRatingService = async (id:string, body:any)=>{
    try {
        let rating = await prisma.rating.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, rating);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete rating
 * @param id 
 * @returns 
 */
export const DeleteRatingService = async (id:string) =>{
    try {
        let rating = await prisma.rating.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


