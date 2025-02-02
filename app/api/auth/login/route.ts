import { getSession, login } from "@/app/lib/auth";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { username,password} = await req.json();
 
  console.log(username);
  if (!username || !password) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 const form = {
    username: username,
    password: password,
 };
 const res = await login(form);
  
 const session = await getSession();
  console.log(res);
  if (res.success)
    return NextResponse.json({ ok: true,message:res.message,token:res.session,session:session}, { status: 200 });
  return NextResponse.json({ message: res.message }, { status: 500 });
}

export { handler as POST, handler as GET };
