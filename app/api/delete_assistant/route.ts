import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
   // Check for authorization header
   const authHeader = req.headers.get('authorization');
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
     return NextResponse.json(
       { message: "Unauthorized - Missing or invalid token" },
       { status: 401 }
     );
   }
 
   // Extract the token (remove 'Bearer ' prefix)
   const token = authHeader.split(' ')[1];
   if (!token) {
     return NextResponse.json(
       { message: "Unauthorized - Token not provided" },
       { status: 401 }
     );
   }
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
