import { register } from "@/app/lib/auth";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { username,password,privilages} = await req.json();
  
  console.log(username);
  if (!username || !password || !privilages) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 const form = {
    username: username,
    password: password,
    type: 'assistant',
    email: `${username}@gmail.com`,
    privilges:privilages
 };
 const res = await register(form);
  
  
  console.log(res);
  if (res.success) 
    return NextResponse.json({ ok: true,message:"Assistant Registered"}, { status: 200 });
  return NextResponse.json({ message: res.message }, { status: 500 });
}

export { handler as POST, handler as GET };
