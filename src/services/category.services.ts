import { PrismaClient } from "@prisma/client";
import { apiResponse } from "../utils/apiResponse";
const categoryClient = new PrismaClient().category;


interface Category {
    name:string,
    slug:string,
    description:string
}

interface UpdateCategory {
    name?:string,
    slug?:string,
    description?:string
}

/**
 * Create a new category
 * @param body 
 * @returns 
 */
export const  createCategoryService = async (body:Category) =>{
    try {
        let {name, slug} = body;
        // Check if name exist
        let nameExist = await categoryClient.findFirst({
            where:{name, isActive:true}
        });

        if(nameExist) return apiResponse(true, [{message:'name already exist', field:'name'}]);

        // Check if slug exist
        let slugExist = await categoryClient.findFirst({
            where:{slug}
        });

        if(slugExist) return apiResponse(true, [{message:'slug already exist', field:"slug"}]);

        let category = await categoryClient.create({
            data:body
        });
        return apiResponse(false, undefined, category);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * List all categories
 * @param token 
 * @returns 
 */
export const getAllCategoriesService = async()=>{
    try {
        
        let categories = await categoryClient.findMany({
            where:{
                isActive:true
            }
        });
        return apiResponse(false, undefined, categories);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}


/**
 * Update category
 * @param token 
 * @param id 
 * @param body 
 * @returns 
 */
export const updateCategoryService = async(id:string, body:UpdateCategory) =>{
    try {
        let category = await categoryClient.update({
            where:{isActive:true, id},
            data:{...body}
        });

        if(!category) return apiResponse(true, [{message:'failed to update category', field:'id'}]);

        return apiResponse(false, undefined, category);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Delete category
 * @param token 
 * @param id 
 * @returns 
 */
export const deleteCategoryService = async (id:string) =>{
    try {
        let categoryExist = await categoryClient.findFirst({
            where:{id, isActive:true}
        });

        if(!categoryExist) return apiResponse(true, [{message:'category does not exist', field:'id'}]);
        let category = await categoryClient.update({
            where:{id},
            data:{
                isActive:false,
                name:`deleted_${categoryExist.name}_${new Date().toISOString()}`
            }
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}
