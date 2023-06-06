import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { IResponseMessage, ResponseCode } from '@/types/backendTypes';
import { failure,success } from '@/common/responseUtils';

type Trial={
    trialId:number;
    projectId:number;
    userId:number;
    trialName:string;
    artifactsUrl:string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query:{projectId},
        method
    }=req;
    const session =await getServerSession(req,res,authOptions);
    if(!session){
        return res.status(401).json(failure("unauthorized"));
    }
    try{
        let response=await fetch(`${process.env.BACKEND_URL}/trials/${projectId}`);
        let responseData:IResponseMessage<Trial[]>=await response.json();
        if(responseData.code!=ResponseCode.Success){
            throw new Error(responseData.errorMessage)
        }
        let trials=responseData.data.map((trial)=>({
            trialId:trial.trialId,
            trialName:trial.trialName,
        }))
        return res.status(200).json(success(trials));
    }catch(err:any){
        return res.status(200).json(failure(err.message))
    }
}