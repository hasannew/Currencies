
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {name, state,city,phone,email,address} = await req.json()
  console.log(name)

  if(!name || !state || !city || !phone || !email || !address){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
  const ex = await db.store.findMany({where:{
    name:name
  }})
     if(ex.length!!=0) {
      return NextResponse.json({message:'Store with this name already exist'},{status:400})
     }
      const refcite = await db.store.create({
        data:{
        name:name,
        state:state,
        city:city,
        phone:phone,
        email:email,
        address:address,
      
        }
      })
      if(refcite)return NextResponse.json({ok:true},{status:200})
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
