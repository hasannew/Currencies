
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {name, userID} = await req.json()
  console.log(name)
  if(!name || !userID){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }

     const now = new Date()
      const refcite = await db.favorite.create({
        data:{
        name:name,
        userid:userID,
        date:now
        }
      })
      if(refcite)return NextResponse.json({ok:true},{status:200})
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
