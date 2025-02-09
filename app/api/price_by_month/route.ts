import { Price } from "@/app/components/prices";
import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";
const get_last = async (state: string, month: number) => {
    let prices: Price[] = [];
    
    const now = new Date();
    // Get the first day of the specified month
    console.log(now.getUTCMonth())
    const startOfMonth = new Date(now.getFullYear(), month, 0);
    
    // Get the last day of the specified month
    const endOfMonth = new Date(now.getFullYear(), month + 1, 0, 23, 59, 59, 999);
  
    prices = await db.price.findMany({
      where: {
        state: state,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
  
    return prices;
  };
async function handler(req: NextRequest) {
  const { state, month} = await req.json();
  
  console.log(state);
  if (!state || !month) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }


    const prices = await get_last(state,month-1);
    //const price_all= await get_last_mean();
  
  console.log(prices);
  if (prices)
    return NextResponse.json({ ok: true, prices: prices}, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
