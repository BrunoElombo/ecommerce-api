import { prisma } from "../config";
import { Product } from "../types/types";
import { apiResponse } from "../utils/errors.utils";
import { slugify } from "../utils/slugify";


// Create product
/**
 * Create a new product
 * @param body 
 * @returns Product
 */
export const CreateProductService = async (body:Product)=>{
    try {
        let {name, slug, ...rest} = body;
        let nameExist = await prisma.product.findFirst({
            where:{name}
        });
        if(nameExist) return apiResponse(true, [{msg:"name already exist", field:"name"}]);

        let slugCreated = slugify(name);
        let product = await prisma.product.create({
            data:{name, slug:slugCreated, ...rest}
        });
        return apiResponse(false, undefined, product);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}
// get product
/**
 * Get a product from id
 * @param id 
 * @returns Product
 */
export const GetProductBySlugService = async (slug:string) =>{
    try {
        let product = await prisma.product.findFirst({
            where:{slug},
            include:{
                variations:true,
                reviews:true,
                ratings:true,
                images:true
            }
        });

        return apiResponse(false, undefined, product);
    } catch (error) {
        throw new Error();
    }
}

// Get products
/**
 * Get all products
 * @returns Products[]
 */
export const GetAllProductsService = async () =>{
    try {
        let products = await prisma.product.findMany();
        return apiResponse(false, undefined, products);
    } catch (error) {
        throw new Error();
    }
}


// update product
/**
 * Update product
 * @param slug 
 * @param body 
 * @returns Product
 */
export const UpdateProductService = async (slug:string, body:any)=>{
    try {
        let product = await prisma.product.update({
            where:{slug: slug}, 
            data:{...body}
        });
        return apiResponse(false, undefined, product);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}]);
    }
}

// Delete product
/**
 * Delete product
 * @param id 
 * @returns 
 */
export const DeleteProductService = async (id:string) =>{
    try {
        let product = await prisma.product.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        throw new Error();
    }
}


// Search products
export const SearchProductService = async(searchValue:string)=>{
    try {
        let products = await prisma.product.findMany({
            where:{}
        })
    } catch (error) {
        throw new Error();
    }
}


// Filter products
/**
 * Filter products
 * @param criteria 
 * @param value 
 * @returns 
 */
// export const FilterProductService = async(criteria:string, value:string)=>{
//     try {
//         let product = await prisma.product.findMany({
//             where:{
//                 OR:[
//                     {
//                         [criteria]:{
//                             contains:value
//                         }
//                     },
//                     {
//                         [criteria]:value
//                     }
//                 ]
//             }
//         });
//         if(!product) apiResponse(false,undefined, []);
//         return apiResponse(false, undefined, product);
//     } catch (error) {
//         throw new Error();
//     }
// }