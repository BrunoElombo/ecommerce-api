import { apiResponse } from "../utils/apiResponse";
import { $Enums, PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken, verifyToken } from "../utils/jwt";
import { FRONT_ADDRESS, prisma } from "../config";
import { hash } from "crypto";
const userClient = new PrismaClient().user


interface UserRegistration{
    email:string,
    username:string,
    firstName:string,
    lastName:string,
    password:string
    phone?:string
}


/**
 * Return access and refresh token if login successful
 * @param username 
 * @param userPassword 
 * @returns 
 */
export const loginUserService = async(username:string, userPassword:string)=>{
    try {
        // check if username or email exist
        let user = await userClient.findUnique({
            where:{
                isActive:true,
                username
            }
        })

        if(!user) return (apiResponse(true, [{message:'user does nnot exist', field:'username'}]))
        // Check if password match

        let passwordMatch = await comparePassword(userPassword, user.password)

        if(!passwordMatch) return (apiResponse(true, [{message:'invali password or username', field:'username, password'}]));

        // generate and return access and reresh tokens
        let {password, refreshToken, verified, createdAt, updatedAt, isActive, ...rest} = user;

        let access = generateToken(rest, '5m');
        let refresh = generateToken(rest, '15m');

        return apiResponse(false, undefined, {access, refresh})
        

    } catch (error) {
        console.log(error);
        return apiResponse(true, [{
            message:`${error}`, field:'server'
        }])
    }
}


export const logoutService = async (token:string) =>{
    try {
        let user = await userClient.update({
            where:{refreshToken:token},
            data:{
                refreshToken:null
            }
        });

        prisma.blacklist.create({
            data:{
                token
            }
        });
        return apiResponse(false, undefined,{})
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}])
    }
}


/**
 * Returns a verification link
 * @param body 
 * @returns 
 */
export const RegisterUserService = async(body:UserRegistration)=>{
    try {
        let {username, email} = body
        // Check if username already exist 
        let userExist = await userClient.findUnique({
            where:{username}
        });

        if(userExist) return apiResponse(true, [{message:'username already exist', field:'username'}]);

        // Check if email exist
        let emailExist = await userClient.findUnique({
            where:{email}
        });

        if(emailExist) return apiResponse(true, [{message:'email already exist', field:'email'}]);

        // desctruction password
        let {password, ...rest} = body
        let userPassword = await hashPassword(password);

        let user = await userClient.create({
            data:{
                password: userPassword,
                ...rest
            }
        });

        let sanitizedUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role:   user.role
          }
        

        // Verify token
        let verificationToken = generateToken(sanitizedUser, '5m');

        return apiResponse(false,undefined, verificationToken);
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}])
    }
}

/**
 * Verifies the token and returns user information if valid
 * @param token 
 * @returns 
 */
export const verifyEmailService = async (token:string) =>{
    try {
        let tokenIsValid:any = verifyToken(token)
        if(!tokenIsValid) return apiResponse(true, [{message:'invalid token', field:'token'}]);

        let user = await userClient.update({
            where:{id:tokenIsValid?.id},
            data:{isActive:true, verified:new Date().toISOString()}
        });

        let { password, refreshToken, isActive, createdAt, updatedAt, verified, ...sanitizedUser } = user

        return apiResponse(false,undefined, sanitizedUser);
        
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Returns the reset password link containing the reset token
 * @param email 
 * @returns 
 */
export const forgotPasswordService = async(email:string)=>{
    const DURATION = 5;
    try {
        // check if email exist
        let user = await userClient.findUnique({
            where:{isActive:true, email}
        });

        if(!user) return apiResponse(true, [{message:"no user found with this email", field:"email"}]);
        // return link
        let token:any = generateToken(user, `${DURATION}m`);

        let link = `${FRONT_ADDRESS}?token=${token}`;

        return apiResponse(false, undefined, {
            message:`This reset password link is available for ${5} minutes`,
            link
        })
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Reset the password of user with the given token
 * @param token 
 * @param newPassword 
 * @returns 
 */
export const newPasswordService = async(token:string, newPassword:string)=>{
    try {
        let tokenIsValid:any = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:`token expired or invalid`, field:'token'}]);

        let newPasswordHash = await hashPassword(newPassword);
        let user = await userClient.update({
            where:{id:tokenIsValid?.id, isActive:true},
            data:{
                password: newPasswordHash
            }
        });
        let { password, refreshToken, isActive, createdAt, updatedAt, verified, ...sanitizedUser } = user
        return apiResponse(false, undefined, sanitizedUser);

    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Reset the user password
 * @param token 
 * @param userPassword 
 * @param newPassword 
 * @returns 
 */
export const resetPasswordService = async(token:string, userPassword:string, newPassword:string)=>{
    try {
        // verify token
        let tokenIsValid:any = verifyToken(token);

        if(!tokenIsValid) return apiResponse(true, [{message:`token expired or invalid`, field:'token'}]);
        // compare password to new password
        let user = await userClient.findUnique({
            where:{id:tokenIsValid?.id, isActive:true},
        });

        if(!user) return apiResponse(true, [{message:`user does not exist or account deleted`, field:'token'}]);

        let passwordIsCorrect = comparePassword(userPassword, user.password);

        if(!passwordIsCorrect) return apiResponse(true, [{message:`the password is invalid`, field:'password'}]);
        
        // Hash password
        let newHashPassword = await hashPassword(newPassword);
        let updatedPassword = await userClient.update({
            where:{id:user.id, isActive:true},
            data:{password:newHashPassword}
        })

        let { password, refreshToken, isActive, createdAt, updatedAt, verified, ...sanitizedUser } = updatedPassword;
        return apiResponse(false, undefined, sanitizedUser);

    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}

/**
 * Returns a new access and refresh
 * @param token 
 * @returns 
 */
export const refreshTokenService = async (token:string) =>{
    try {
        let tokenIsValid = verifyToken(token);
        if(!tokenIsValid) return apiResponse(true, [{message:`token expired or invalid`, field:'token'}]);

        let user = await userClient.findFirst({
            where:{
                refreshToken:token,
                isActive:true
            }
        });

        if(!user) return apiResponse(true, [{message:'user not found or deleted', field:'token'}])

        let { password, refreshToken, isActive, createdAt, updatedAt, verified, ...sanitizedUser } = user;
        // generate new access and refresh tokens
        let access = generateToken(sanitizedUser, '5m');
        let refresh = generateToken(sanitizedUser, '15m');

        return apiResponse(false, undefined, {access, refresh});

        
    } catch (error) {
        console.log(error);
        return apiResponse(true, [{message:`${error}`, field:'server'}]);
    }
}
