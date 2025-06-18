import { prisma } from "../config";
import { Address } from "../types/types";
import { apiResponse } from "../utils/errors.utils";


/**
 * Create a new address
 * @param body 
 * @returns Address
 */
export const CreateAddressService = async (body:Address)=>{
    try {
        
        let address = await prisma.address.create({
            data:{...body}
        })

        if(address) return apiResponse(false, undefined, address);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Get an address from id
 * @param id 
 * @returns Address
 */
export const GetAddressByIdService = async (id:string) =>{
    try {
        let address = await prisma.address.findFirst({
            where:{id}
        });
        return apiResponse(false, undefined, address);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Get all addresses
 * @returns Addresses[]
 */
export const GetAllAddressesService = async () =>{
    try {
        let addresses = await prisma.address.findMany();
        return apiResponse(false, undefined, addresses);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}



/**
 * Update address
 * @param id 
 * @param body 
 * @returns Address
 */
export const UpdateAddressService = async (id:string, body:any)=>{
    try {
        let address = await prisma.address.update({
            where:{id}, 
            data:{...body}
        });
        return apiResponse(false, undefined, address);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}


/**
 * Delete address
 * @param id 
 * @returns 
 */
export const DeleteAddressService = async (id:string) =>{
    try {
        let address = await prisma.address.delete({
            where:{id}
        });

        return apiResponse(false, undefined, {});
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{msg:`${error}`, field:"server"}])
    }
}
