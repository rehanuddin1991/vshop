import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
export async function POST(req,res) {
    try{
        let reqBody=await req.json();
        console.log(reqBody);
        //reqBody.otp="0";
        const prisma=new PrismaClient();
        const result=await prisma.product.create({data:reqBody})
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}