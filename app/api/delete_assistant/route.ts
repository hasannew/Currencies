import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { assistantId} = await req.json();
  

  if (!assistantId) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 const res = await db.user.delete({
    where:{
        id:assistantId
    }
 })
  
  
  console.log(res);
  if (res) 
    return NextResponse.json({ ok: true,message:"Assistant Deleted"}, { status: 200 });
  return NextResponse.json({ message: "Error Deleting Assistant"}, { status: 500 });
}

export { handler as POST, handler as GET };
