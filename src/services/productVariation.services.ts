import { PrismaClient, VariationType } from "@prisma/client";
import { apiResponse } from "../utils/apiResponse";
import { prisma } from "../config";
const productVariationClient = new PrismaClient().productVariation;

interface ProductVariation {
    productId:string,
    variation:VariationType,
    value:string,
    additionalPrice?:number
}

interface UpdateProductVariation {
    productId?:string,
    variation?:VariationType,
    value?:string,
    additionalPrice?:number
}

/**
 * Create a new product variation
 * @param body 
 * @returns 
 */
export const  createProductVariationService = async (body:ProductVariation) =>{
    let {productId, ...rest} = body;
    
    try {
        // Check if the productionId
        let productExist = await prisma.product.findUnique({
            where:{id:productId}
        })
        if(!productExist) return apiResponse(true, [{message:'product does not exist', field:'productId'}]);
    

        let productVariation = await productVariationClient.create({
            data:{productId, ...rest}
        });

        return apiResponse(false, undefined, productVariation);
        
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Update product variation
 * @param token
 * @param id 
 * @param body 
 * @returns 
 */
export const updateProductVariationService = async(id:string, body:UpdateProductVariation) =>{
    try {
        let variation = await productVariationClient.update({
            where:{isActive:true, id},
            data:{...body}
        });
        if(!variation) return apiResponse(true, [{message:'failed to update product', field:'id'}]);
        return apiResponse(false, undefined, variation);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete product variation
 * @param token 
 * @param id 
 * @returns 
 */
export const deleteProductVariationService = async (id:string) =>{
    try {
        // check if the variation exist
        let variationExist = await productVariationClient.findUnique({
            where:{id, isActive:true}
        });

        if(!variationExist) return apiResponse(true, [{message:'product variation does not exist', field:'id'}]);

        let variation = await productVariationClient.delete({
            where:{id, isActive:true}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}
