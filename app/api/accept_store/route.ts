import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { storeId} = await req.json();

  
  console.log(storeId);
  if (!storeId) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 
 const res = await db.store.findMany({where:{
    id:storeId
 }})
  if (res.length!=0) {
const mod = await db.store.update({where:{
    id:res[0].id
},data:{
    status:'active'
}})
if(mod) {
    return NextResponse.json({ ok: true,message:"Store Accepted"}, { status: 200 });
}
  }
  
  console.log(res);
  
   
  return NextResponse.json({ message: "error accepting store" }, { status: 500 });
}

export { handler as POST, handler as GET };
