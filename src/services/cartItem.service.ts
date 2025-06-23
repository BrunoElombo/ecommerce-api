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
        let {userId, productId, variations, qty} = body;

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
        if(variations?.length > 0){
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
        if(variations?.length > 0){
            let cartItems= await variations.map(async varn => {
                let cartItem = await prisma.cartItem.create({
                    data:{
                        productId, userId, sku, variationId:varn, qty
                    }
                });

                return cartItem;
            })
            return apiResponse(false, undefined, cartItems);
        }else{
            let cartItem = await prisma.cartItem.create({
                data:{
                    productId, userId, sku, qty
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
 * Get an cart item from id
 * @param id 
 * @returns CartItem
 */
export const GetCartItemByIdService = async (id:string) =>{
    try {
        let cartItem = await prisma.cartItem.findFirst({
            where:{id}
        });
        return apiResponse(false, undefined, cartItem);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}

/**
 * Find cart item from sku
 * @param sku 
 * @returns CartItems
 */
export const GetCartItemsBySKUService = async (sku:string) =>{
    try {
        let cartItems = await prisma.cartItem.findMany({
            where:{sku}
        });
        return apiResponse(false, undefined, cartItems);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all cartItems
 * @returns CartItems[]
 */
export const GetOwnCartItemsService = async (userId: string) => {
    try {
        // Fetch all cart items for the user, including product and variation
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: {
                product: true,
                variation: true,
            },
        });

        // Group by sku
        const grouped = cartItems.reduce((acc: any, item) => {
            if (!acc[item.sku]) {
                acc[item.sku] = {
                    sku: item.sku,
                    qty: item.qty,
                    product: item.product,
                    variations: [],
                    createdAt: item.createdAt,
                };
            }
            if (item.variation) {
                acc[item.sku].variations.push(item.variation);
            }
            return acc;
        }, {});

        
        const result = Object.values(grouped);

        return apiResponse(false, undefined, result);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{ msg: `${error}`, field: "server" }]);
    }
}



/**
 * Update cartItem
 * @param id 
 * @param body 
 * @returns CartItem
 */
export const UpdateCartItemService = async (id:string, body:any)=>{
    try {
        let cartItem = await prisma.cartItem.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, cartItem);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete cartItem
 * @param id 
 * @returns 
 */
export const DeleteCartItemService = async (id:string) =>{
    try {
        let cartItem = await prisma.payment.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}
