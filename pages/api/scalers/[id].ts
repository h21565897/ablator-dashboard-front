import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { IResponseMessage, ResponseCode } from '@/types/backendTypes';
import { failure,success } from '@/common/responseUtils';

interface scalerRecord{
    scalerId:number;
    trialId:number;
    scaler:string;
}


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {
        query:{id:trialId},
        method
    }=req;
    try{
        const session =await getServerSession(req,res,authOptions);
        if(!session){
            return res.status(200).json(failure("unauthorized"));
            
        }
        const userId=session?.userId;
        let response=await fetch(`${process.env.BACKEND_URL}/files/scalers/${trialId}`)
        let responseData:IResponseMessage<scalerRecord[]>=await response.json();
        if(responseData.code!=ResponseCode.Success){
            throw new Error(responseData.errorMessage)
        }
        return res.status(200).json(success(responseData.data));
    }
    catch(err:any){
        return res.status(200).json(failure(err.message))
    }
}