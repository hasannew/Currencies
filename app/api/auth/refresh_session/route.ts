import { getSession, refresh_session } from "@/app/lib/auth";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { token} = await req.json();
 
  console.log(token);
  if (!token) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 
 const res = await refresh_session(token);
  

 const session = await getSession();
 console.log(res);
 if (res.success)
   return NextResponse.json({ ok: true,message:res.message,token:res.session,session:session}, { status: 200 });
 return NextResponse.json({ message: res.message }, { status: 500 });
}

export { handler as POST, handler as GET };
