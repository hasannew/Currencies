import { Price } from "@/app/components/prices";
import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";
const get_last = async (state: string, name: string, scale: 'Highest' | 'Lowest') => {
    let prices: Price[] = [];
    let i = 0;
    const now = new Date();
    let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
  
    while (prices.length == 0 && i < 6) {
      prices = await db.price.findMany({
        where: {
          state: state,
          name: name,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        orderBy: {
          purchase_price: scale === 'Highest' ? 'desc' : 'asc'
        },
        take: 1  // Only take the highest/lowest price
      });
  
      i = i + 1;
      now.setDate(now.getDate() - i);
      startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
  
    return prices;
  };
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
  const { state, currency,scale} = await req.json();
  
  console.log(state);
  if (!state || !currency || !scale) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }


    const prices = await get_last(state,currency,scale);
    //const price_all= await get_last_mean();
  
  console.log(prices);
  if (prices)
    return NextResponse.json({ ok: true, prices: prices}, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
