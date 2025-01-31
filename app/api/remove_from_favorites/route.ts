
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {name, userID} = await req.json()
  console.log(name)
  if(!name || !userID){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }

     let removed;
      const favorites = await db.favorite.findMany({
        where:{
            userid:userID,
            name:name
        }
      })
      if(favorites)
      {
        removed = await db.favorite.delete({where:{
            id:favorites[0].id
        }})
      }
      if (removed) return NextResponse.json({ok:true},{status:200})
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
