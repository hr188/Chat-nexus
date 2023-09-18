import { currentProfile } from "@/lib/curr-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params} : {params :{serverId :string}}
){
    try{
        const profile = await currentProfile();
        const {name , imageUrl } = await req.json();
        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const server = await db.server.update({
            where:{
                id:params.serverId,
                profileId:profile.id,
            },
            data:{
                name,
                imageUrl
            },
        })
        return  NextResponse.json(server);
    }
    catch(error){
        console.log("[SERVER] [PATCH] [ERROR]",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}