import { PrismaClient } from "@prisma/client";
import { apiResponse } from "../utils/apiResponse";
import { verifyToken } from "../utils/jwt";
const addressClient = new PrismaClient().address;


interface Address {
    userId:string,
    line1:string,
    line2?:string,
    city:string,
    state:string,
    postalCode:string,
    country:string
}

interface UpdateAddress {
    line1?:string,
    line2?:string,
    city?:string,
    state?:string,
    postalCode?:string,
    country?:string
}

/**
 * Create a new address
 * @param body 
 * @returns 
 */
export const  createAddressService = async (body:Address) =>{
    try {
        let address = await addressClient.create({
            data:body
        });
        return apiResponse(false, undefined, address);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * List own addresses
 * @param token 
 * @returns 
 */
export const getOwnAddressService = async(token:string = "")=>{
    try {
        let tokenIsValid:any = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:`invalid or expired token`, field:'token'}]);
        let addresses = await addressClient.findMany({
            where:{
                userId:tokenIsValid.id,
                isActive:true
            }
        });
        return apiResponse(false, undefined, addresses)
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * Update own address
 * @param token 
 * @param id 
 * @param body 
 * @returns 
 */
export const updateOwnAddressService = async(token:string="", id:string, body:UpdateAddress) =>{
    try {
        let tokenIsValid:any = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:'invalid or expired token', field:'token'}]);

        let address = await addressClient.update({
            where:{isActive:true, id, userId:tokenIsValid.id},
            data:{...body}
        });

        if(!address) return apiResponse(true, [{message:'failed to update address', field:'id'}]);

        return apiResponse(false, undefined, address);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete own address
 * @param token 
 * @param id 
 * @returns 
 */
export const deleteOwnAddressService = async (token:string="", id:string) =>{
    try {

        let tokenIsValid:any = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:'invalid or expired token', field:'token'}]);

        let address = await addressClient.update({
            where:{id, userId:tokenIsValid.id},
            data:{isActive:false}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}
