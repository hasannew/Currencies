import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { type} = await req.json();
  

  if (!type) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 const res = await db.user.findMany({
    where:{
        type:'assistant'
    }
 })
  
  
  console.log(res);
  if (res) 
    return NextResponse.json({ ok: true,assistants:res}, { status: 200 });
  return NextResponse.json({ message: "Error Fetching Assistants"}, { status: 500 });
}

export { handler as POST, handler as GET };
