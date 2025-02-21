
import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


async function handler(req: NextRequest) {
  const { storeID,storeName } = await req.json();

  console.log(storeID);
  if (!storeID && !storeName) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
  let store;
  if (storeName) {
  store = await db.store.findMany({where:{
      name:storeName
  }});

  }
  else {
    store = await db.store.findMany({where:{
      id:storeID
  }});
  }
   
 
    const schedule = await db.schedule.findMany({where:{
      storeid:store[0].id
  }});
  console.log(store);
  console.log(schedule)
  if (store)
    return NextResponse.json({ ok: true, store: store[0],schedule:schedule[0] }, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
