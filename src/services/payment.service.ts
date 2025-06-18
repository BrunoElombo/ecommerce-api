import { prisma } from "../config";
import { Payment } from "../types/types";
import { apiResponse } from "../utils/errors.utils";


/**
 * Create a new payment
 * @param body 
 * @returns Payment
 */
export const CreatePaymentService = async (body:Payment)=>{
    try {
        
        let payment = await prisma.payment.create({
            data:{...body}
        })

        if(payment) return apiResponse(false, undefined, payment);
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
