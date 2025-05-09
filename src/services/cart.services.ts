import { PrismaClient } from "@prisma/client";
import { apiResponse } from "../utils/apiResponse";
import { verifyToken } from "../utils/jwt";
const cartItemClient = new PrismaClient().cartItem;


interface CartItem {
    userId:string,
    productId:string,
    quantity:number,
}

interface UpdateCartItem {
    userId?:string,
    productId?:string,
    quantity?:number,
}

/**
 * Create a new cart item
 * @param body 
 * @returns 
 */
export const  createCartItemService = async (body:CartItem) =>{
    try {
        let cartItem = await cartItemClient.create({
            data:body
        });
        return apiResponse(false, undefined, cartItem);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * List own cart item
 * @param token 
 * @returns 
 */
export const getOwnCartItemService = async(token:string = "")=>{
    try {
        let tokenIsValid:any = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:`invalid or expired token`, field:'token'}]);
        let cartItems = await cartItemClient.findMany({
            where:{
                userId:tokenIsValid.id,
            },
            include:{
                product:true
            }
        });
        return apiResponse(false, undefined, cartItems)
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * Update own cart item
 * @param token 
 * @param id 
 * @param body 
 * @returns 
 */
export const updateOwnCartItemService = async(token:string="", id:string, body:UpdateCartItem) =>{
    try {
        let tokenIsValid:any = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:'invalid or expired token', field:'token'}]);

        let cartItem = await cartItemClient.update({
            where:{id, userId:tokenIsValid.id},
            data:{...body}
        });

        if(!cartItem) return apiResponse(true, [{message:'failed to update cart item', field:'id'}]);

        return apiResponse(false, undefined, cartItem);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete own cart item
 * @param token 
 * @param id 
 * @returns 
 */
export const deleteOwnCartItemService = async (token:string="", id:string, productId:string) =>{
    try {
        let tokenIsValid:any = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:'invalid or expired token', field:'token'}]);

        let cartItem = await cartItemClient.delete({
            where:{id, userId:tokenIsValid.id, productId},
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}
