
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {storeid} = await req.json()
  

  if(!storeid){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1);
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  console.log(startOfDay)
  const ex = await db.bulletin.findMany({where:{
    storeid:storeid,
    date: {
        gte: startOfDay,
        lte: endOfDay,
      },
  }})

      if(ex) return NextResponse.json({ok:true,bulletins:ex},{status:200})
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
