import { register } from "@/app/lib/auth";

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { username,email,password, passwordC,type,store_name,state,city,phone,address} = await req.json();
  
  console.log(username);
  if (!username || !email || !password || !type) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
 const form = {
    username: username,
    password: password,
    type: type,
    email: email,
    passwordC: passwordC,
    store_name: store_name,
    state: state,
    city: city,
    address: address,
    phone: phone
 };
 const res = await register(form);
  
  
  console.log(res);
  if (res.success)
    return NextResponse.json({ ok: true,message:"User Registered"}, { status: 200 });
  return NextResponse.json({ message: res.message }, { status: 500 });
}

export { handler as POST, handler as GET };
