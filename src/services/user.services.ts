import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/password";
import { apiResponse } from "../utils/apiResponse";
const userClient = new PrismaClient().user;

/**
 * Returns the list of users
 * @returns 
 */
export const getAllUsersService = async () =>{
    try {
        let users = await userClient.findMany({
            where:{isActive:true}
        });
        
        let sanitizedUsers = users.map(user=>{
            let {password, ...rest} = user;
            return rest;
        });
        return apiResponse(false,undefined,sanitizedUsers);
    } catch (error) {
        console.log(error)
        return apiResponse(true, [{message:'Failed to get all users', field:"server"}])
    }
}


/**
 * Returns user with id params
 * @param id 
 * @returns 
 */
export const getuserByIdService = async(id:string)=>{
    try {
        let user = await userClient.findUnique({
            where:{id, isActive:true},
        });
        if(!user) return apiResponse(true, [{message:'User not found', field:"id"}])
        let {password, ...rest} = user;
        return apiResponse(false,undefined,rest);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:'Failed to get user', field:"server"}])
    }
}


/**
 * Returns user with id params
 * @param id 
 * @returns 
 */
export const getuserByParamsService = async(id:string)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:'Failed to get user', field:"server"}])
    }
}


/**
 * Returns the newly created user
 * @param body 
 * @returns 
 */
export const createUserService = async (body:any) =>{
    let {password, ...rest} = body;
    try {
        
        // Check if the email already exist
        let emailExist = await userClient.findFirst({
            where:{
                isActive:true, 
                email: rest.email
            }
        });
        if(emailExist) return apiResponse(true, [{
            message:"Email already taken",
            field:"email"
        }]);
        
        
        // Check if phone already exist
        let phoneExist = await userClient.findFirst({
            where:{
                isActive:true, 
                email: rest.email
            }
        });
        if(phoneExist) return apiResponse(true, [{
            message:"Phone already taken",
            field:"phone"
        }]);

        // Check if the username already exist
        let usernameExist = await userClient.findFirst({
            where:{
                isActive:true, 
                email: rest.email
            }
        });        
        if(usernameExist) return apiResponse(true, [{
            message:"Username already taken",
            field:"username"
        }]);

        // Check if is ADMIN user
        let users = await userClient.findMany({where:{isActive:true}});
        if(users.length < 1){
            rest.role = "ADMIN";
        }

        let hashedPassword = await hashPassword(body.password)
        let newUser = await userClient.create({
            data: {password:hashedPassword, ...rest},
        });
        let {password, ...user} =newUser;
        return apiResponse(false,undefined,user);

    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}

/**
 * Returns the updated user information or an error
 * @param id 
 * @param body 
 * @returns 
 */
export const updateUserService = async (id:string, body:any) =>{
    try {
        let user = await userClient.update({
            where:{id, isActive:true},
            data:body
        });

        if(!user) return apiResponse(true, [{
            message:'User does not exist',
            field:'id'
        }])
        let {password, ...rest} =user;
        return apiResponse(false,undefined,rest)
    } catch (error) {
        console.log(error)
        return apiResponse(true, [{
            message:'Failed to update user',
            field:'server'
        }])
    }
}

/**
 * Delete the user by id
 * @param id 
 */
export const deleteUserService = async (id:string) =>{
    try {
        let userExist = await userClient.findFirst({
            where:{id, isActive:true}
        });

        if(!userExist) return apiResponse(true, [{
            message:"User does not exist",
            field:'id'
        }]);

        userClient.update({
            where:{id, isActive:true},
            data:{
                
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}
