import { prisma } from "../config";
import { ProductCategory } from "../types/types";
import { apiResponse } from "../utils/errors.utils";
import { slugify } from "../utils/slugify";


/**
 * Create a new product category
 * @param body 
 * @returns ProductCategory
 */
export const CreateProductCategoryService = async (body:ProductCategory)=>{
    try {
        let {productId, categoryId} = body;
        let productExist = await prisma.product.findFirst({
            where:{id:productId}
        });

        if(!productExist) return apiResponse(true, [{msg:"product does not exist", field:"productId"}]);

        let categoryExist = await prisma.category.findFirst({
            where:{id: categoryId}
        });

        if(!categoryExist) return apiResponse(true, [{msg:"category does not exist", field:"categoryId"}]);

        let productCategory = await prisma.productCategory.create({
            data:{productId, categoryId}
        });

        if(productCategory) return apiResponse(false, undefined, productCategory);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Get a product category from id
 * @param id 
 * @returns product category
 */
export const GetProductCategoryByIdService = async (id:string) =>{
    try {
        let productCategory = await prisma.productCategory.findFirst({
            where:{id}
        });
        return apiResponse(false, undefined, productCategory);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all product categories
 * @returns product categories[]
 */
export const GetAllProductCategoriesService = async () =>{
    try {
        let productCategories = await prisma.productCategory.findMany();
        return apiResponse(false, undefined, productCategories);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Update product category
 * @param id 
 * @param body 
 * @returns Product Category
 */
export const UpdateProductCategoryService = async (id:string, body:any)=>{
    try {
        let productCategory = await prisma.productCategory.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, productCategory);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete product category
 * @param id 
 * @returns 
 */
export const DeleteProductCategoryService = async (id:string) =>{
    try {
        let productCategory = await prisma.productCategory.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}
