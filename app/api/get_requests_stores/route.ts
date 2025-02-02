
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {type} = await req.json()

  if(!type){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }

     
      const stores = await db.store.findMany({
       
        where:{
            status:'inactive'
        }
      })
      if(stores)return NextResponse.json({ok:true,stores:stores},{status:200})
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
