
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {userID} = await req.json()

  if(!userID){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }

     
      const favorites = await db.favorite.findMany({
       
        where:{
            userid:userID
        }
      })
      if(favorites)return NextResponse.json({ok:true,favorites:favorites},{status:200})
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
