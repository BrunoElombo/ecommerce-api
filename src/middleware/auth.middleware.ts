import { Request, Response, NextFunction } from 'express';
import { compareToken } from '../utils/jwt';
import HTTP_STATUS from '../utils/http.utils';
import { prisma } from '../config';


export const verifyToken = async(req:Request, res:Response, next:NextFunction) =>{
    let { authorization } = req.headers

    if(!authorization) {
        res.sendStatus(HTTP_STATUS.UN_AUTHORIZED.statusCode);
        return
    }
    let token = authorization.split(' ')[1]

    if(!token){
        res.sendStatus(HTTP_STATUS.UN_AUTHORIZED.statusCode);
        return;
    }

    let isBlacklisted = await prisma.blacklist.findFirst({where:{token}});
    if(isBlacklisted?.id){
        res.sendStatus(HTTP_STATUS.UN_AUTHORIZED.statusCode);
        return
    }

    try {
        let user = await compareToken(token);
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res
        .status(HTTP_STATUS.UN_AUTHORIZED.statusCode)
        .json({error: 'Token is valid or expired'});
        return
    }
}