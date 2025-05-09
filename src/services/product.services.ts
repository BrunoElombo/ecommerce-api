import { PrismaClient } from "@prisma/client";
import { apiResponse } from "../utils/apiResponse";
import { prisma } from "../config";
const productClient = new PrismaClient().product;


interface Product {
    name:string,
    slug:string,
    title:string,
    description:string,
    price:number,
    stock:number,
    categoryId:string
}

interface UpdateProduct {
    name?:string,
    slug?:string,
    title?:string,
    description?:string,
    price?:number,
    stock?:number,
    categoryId?:string
}

/**
 * Create a new product
 * @param body 
 * @returns 
 */
export const  createProductService = async (body:Product) =>{
    let { slug, title, categoryId, ...rest} = body;
    // Check if slug exist
    let slugExist = await productClient.findFirst({
        where:{slug, isActive:true}
    });

    if(slugExist) return apiResponse(true, [{message:'slug already exist', field:'slug'}]);
    // Check if title exist
    let titleExist = await productClient.findFirst({
        where:{title, isActive:true}
    });
    if(titleExist) return apiResponse(true, [{message:'title already exist', field:'title'}]);
    // Check if category exist
    let categoryExist = await prisma.category.findUnique({
        where:{id:categoryId, isActive:true}
    });

    if(!categoryExist) return apiResponse(true, [{message:'invalid category', field:'categoryId'}]);

    let formatedSlug = slug.trim().replace(' ', '-');

    try {
        let product = await productClient.create({
            data:{slug:formatedSlug, title, categoryId, ...rest}
        });
        return apiResponse(false, undefined, product);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * List all products
 * @param token 
 * @returns 
 */
export const getAllProductsService = async()=>{
    try {
        
        let products = await productClient.findMany({
            where:{
                isActive:true
            }
        });
        return apiResponse(false, undefined, products);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * Get product by id
 * @param id 
 * @returns 
 */
export const getProductByIdService = async(id:string)=>{
    try {
        
        let product = await productClient.findMany({
            where:{
                id,
                isActive:true
            },
            include:{
                variations:true,
                reviews:true,
                wishLists:true,
                cartItems:true,
                orderItem:true
            }
        });
        return apiResponse(false, undefined, product);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Update product
 * @param token 
 * @param id 
 * @param body 
 * @returns 
 */
export const updateProductService = async(id:string, body:UpdateProduct) =>{
    try {
        let product = await productClient.update({
            where:{isActive:true, id},
            data:{...body}
        });

        if(!product) return apiResponse(true, [{message:'failed to update product', field:'id'}]);

        return apiResponse(false, undefined, product);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete product
 * @param token 
 * @param id 
 * @returns 
 */
export const deleteProductService = async (id:string) =>{
    try {
        let productExist = await productClient.findFirst({
            where:{id, isActive:true}
        });

        if(!productExist) return apiResponse(true, [{message:'product does not exist', field:'id'}]);
        
        let product = await productClient.update({
            where:{id},
            data:{
                isActive:false,
                title:`deleted_${productExist?.title}_${new Date().toISOString()}`
            }
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}
