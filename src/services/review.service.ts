import { prisma } from "../config";
import { Review } from "../types/types";
import { apiResponse } from "../utils/errors.utils";


/**
 * Create a new review
 * @param body 
 * @returns Review
 */
export const CreateReviewService = async (body:Review)=>{
    try {
        
        let review = await prisma.review.create({
            data:{...body}
        })

        if(review) return apiResponse(false, undefined, review);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Get an review from product id
 * @param id 
 * @returns Reviews
 */
export const GetReviewByProductIdService = async (id:string) =>{
    try {
        let reviews = await prisma.review.findMany({
            where:{productId: id}
        });
        return apiResponse(false, undefined, reviews);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all reviews
 * @returns Reviews[]
 */
export const GetAllReviewsService = async () =>{
    try {
        let reviews = await prisma.review.findMany();
        return apiResponse(false, undefined, reviews);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Update review
 * @param id 
 * @param body 
 * @returns Reviews
 */
export const UpdateReviewService = async (id:string, body:any)=>{
    try {
        let review = await prisma.review.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, review);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete address
 * @param id string
 * @returns review
 */
export const DeleteReviewService = async (id:string) =>{
    try {
        let review = await prisma.review.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Approve a review
 * @param id string
 * @returns review
 */
export const ApproveReviewService = async (id:string)=>{
    try {
        let review= await prisma.review.update({
            where:{id},
            data:{
                status: "APPROVED"
            }
        });

        if(review) return apiResponse(true, [{msg:"review does not exist", field:"id"}]);
        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error)
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Approve a review
 * @param id string
 * @returns review
 */
export const RejectReviewService = async (id:string)=>{
    try {
        let review= await prisma.review.update({
            where:{id},
            data:{
                status: "REJECTED"
            }
        });

        if(review) return apiResponse(true, [{msg:"review does not exist", field:"id"}]);
        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error)
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}

