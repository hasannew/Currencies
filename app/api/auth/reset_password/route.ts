import { reset_password } from "@/app/lib/auth";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { username,password, passwordC} = await req.json();
  
  console.log(username);
  if (!username || !username || !passwordC) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }

 if (password!==passwordC) {
    return NextResponse.json({ message: 'passwords did not match' }, { status: 500 });
 }
 const res = await reset_password(username,password);
  
  
  console.log(res);
  if (res.success)
    return NextResponse.json({ ok: true,message:res.message}, { status: 200 });
  return NextResponse.json({ message: res.message }, { status: 500 });
}

export { handler as POST, handler as GET };
