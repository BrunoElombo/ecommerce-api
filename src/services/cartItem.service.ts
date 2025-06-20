import { prisma } from "../config";
import { CartItem } from "../types/types";
import { apiResponse } from "../utils/errors.utils";


/**
 * Create a new cart item
 * @param body 
 * @returns CartItem
 */
export const CreateCartItemService = async (body:CartItem)=>{
    try {
        let {userId, productId, variations} = body;

        // Check if the user exist
        let userExist = await prisma.user.findFirst({
            where:{
                id: userId,
            }
        });

        if(!userExist) return apiResponse(true, [{msg:"user does not exist", field:"userId"}]);

        // Check if the product exist
        let productExist = await prisma.product.findFirst({
            where:{id:productId}
        });

        if(!productExist) return apiResponse(true, [{msg:"product does not exist", field:"productId"}]);

        // Check if the variations exist
        let errs: any[] = [];
        if(variations.length > 0){
            variations.map(async variation =>{
                let varn = await prisma.productVariation.findFirst({
                    where:{id: variation}
                });
    
                if(!varn){
                    errs.push(variation)
                }
            } )            
        }
        if(errs.length > 0) return apiResponse(true, [{msg:"Variations does not exist", field:""}]);

        // Create SKU
        let sku = `${productId}-${userId}-${new Date()}`

        // Handle cartItem with variations
        if(variations.length > 0){
            let cartItems= await variations.map(async varn => {
                let cartItem = await prisma.cartItem.create({
                    data:{
                        productId, userId, sku, variationId:varn
                    }
                });

                return cartItem;
            })
            return apiResponse(false, undefined, cartItems);
        }else{
            let cartItem = await prisma.cartItem.create({
                data:{
                    productId, userId, sku
                }
            });
            return apiResponse(false, undefined, cartItem);
        }
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Get an payment from id
 * @param id 
 * @returns Payment
 */
export const GetPaymentByIdService = async (id:string) =>{
    try {
        let payment = await prisma.payment.findFirst({
            where:{id}
        });
        return apiResponse(false, undefined, payment);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all payments
 * @returns Payments[]
 */
export const GetAllPaymentsService = async () =>{
    try {
        let payments = await prisma.payment.findMany();
        return apiResponse(false, undefined, payments);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Update payment
 * @param id 
 * @param body 
 * @returns Payment
 */
export const UpdatePaymentService = async (id:string, body:any)=>{
    try {
        let payment = await prisma.payment.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, payment);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete payment
 * @param id 
 * @returns 
 */
export const DeletePaymentService = async (id:string) =>{
    try {
        let payment = await prisma.payment.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}
