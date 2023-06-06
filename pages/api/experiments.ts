import type { NextApiRequest, NextApiResponse } from 'next'

import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { failure, success } from '@/common/responseUtils';
import { IResponseMessage, ResponseCode } from '@/types/backendTypes';


type experiment={
    projectId:number;
    userId:number;
    projectName:string;
    artifactsUrl:string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session=await getServerSession(req,res,authOptions)
    if(!session){
        res.status(200).json(failure("unauthorized"))
        return;
    }
    try{
        const response=await fetch(`${process.env.BACKEND_URL}/projects`,{
            method:"GET",
            headers:{
                "Authentication":`${session?.userId}`
            }
        })
        const responseData:IResponseMessage<experiment[]>=await response.json();
        
        if(responseData.code!=ResponseCode.Success){
            throw new Error(responseData.errorMessage)
        }
        
        let reassembleProjects=responseData.data.map((project)=>({
            projectId:project.projectId,
            projectName:project.projectName,
        }))
        return res.status(200).json(success(reassembleProjects))

    }catch(err:any){
        console.log(err.message)
        return res.status(200).json(failure(err.message))
    }
    
}