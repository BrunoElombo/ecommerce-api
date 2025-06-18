import { prisma } from "../config";
import { ProductVariation } from "../types/types";
import { apiResponse } from "../utils/errors.utils";
import { slugify } from "../utils/slugify";
import { Variation } from "@prisma/client";


/**
 * Create a new product variation
 * @param body 
 * @returns ProductVariation
 */
export const CreateProductVariationService = async (body:ProductVariation)=>{
    try {
        
        let ProductVariation = await prisma.productVariation.create({
            data:{...body}
        })

        if(ProductVariation) return apiResponse(false, undefined, ProductVariation);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Get a product variation from id
 * @param id 
 * @returns product variation
 */
export const GetProductVariationByIdService = async (id:string) =>{
    try {
        let productVariation = await prisma.productVariation.findFirst({
            where:{id}
        });
        return apiResponse(false, undefined, productVariation);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all product variations
 * @returns product variations[]
 */
export const GetAllProductVariationsService = async () =>{
    try {
        let productVariations = await prisma.productCategory.findMany();
        return apiResponse(false, undefined, productVariations);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Update product variation
 * @param id 
 * @param body 
 * @returns Product variation
 */
export const UpdateProductVariationService = async (id:string, body:any)=>{
    try {
        let ProductVariation = await prisma.productCategory.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, ProductVariation);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete product variation
 * @param id 
 * @returns 
 */
export const DeleteProductVariationService = async (id:string) =>{
    try {
        let productVariation = await prisma.productVariation.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}
