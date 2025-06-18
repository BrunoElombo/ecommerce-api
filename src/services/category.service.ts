import { prisma } from "../config";
import { Category } from "../types/types";
import { apiResponse } from "../utils/errors.utils";
import { slugify } from "../utils/slugify";


/**
 * Create a new category
 * @param body 
 * @returns Category
 */
export const CreateCategoryService = async (body:Category)=>{
    try {
        let {name, slug, ...rest} = body;
        let nameExist = await prisma.category.findFirst({
            where:{name}
        });
        if(nameExist) return apiResponse(true, [{msg:"name already exist", field:"name"}]);

        let slugCreated = slugify(name);
        let category = await prisma.category.create({
            data:{name, slug:slugCreated, ...rest}
        });
        return apiResponse(false, undefined, category);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get a category from id
 * @param id 
 * @returns Category
 */
export const GetCategoryByIdService = async (id:string) =>{
    try {
        let category = await prisma.category.findFirst({
            where:{id}
        });
        return apiResponse(false, undefined, category);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all categories
 * @returns categories[]
 */
export const GetAllCategoriesService = async () =>{
    try {
        let categories = await prisma.category.findMany();
        return apiResponse(false, undefined, categories);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Update category
 * @param id 
 * @param body 
 * @returns Category
 */
export const UpdateCategoryService = async (id:string, body:any)=>{
    try {
        let category = await prisma.product.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, category);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete category
 * @param id 
 * @returns 
 */
export const DeleteCategoryService = async (id:string) =>{
    try {
        let category = await prisma.category.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


// Search categories
export const SearchCategoriesService = async(searchValue:string)=>{
    try {
        let categories = await prisma.category.findMany({
            where:{}
        });
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}
