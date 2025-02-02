import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { assistantId,privilages} = await req.json();
  
  console.log(privilages);
  if (!assistantId || !privilages) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 const res = await db.user.update({
    where:{
        id:assistantId
    },data:{
        privilages:privilages
    }
 })
  
  
  console.log(res);
  if (res) 
    return NextResponse.json({ ok: true,message:"Privilages Updated"}, { status: 200 });
  return NextResponse.json({ message: "Error Updating Privilages"}, { status: 500 });
}

export { handler as POST, handler as GET };
