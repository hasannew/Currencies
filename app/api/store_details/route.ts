
import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


async function handler(req: NextRequest) {
  const { storeID } = await req.json();

  console.log(storeID);
  if (!storeID) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }


    const store = await db.store.findMany({where:{
        id:storeID
    }});
 
  
  console.log(store);
  if (store)
    return NextResponse.json({ ok: true, store: store[0] }, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
