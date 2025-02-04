import { Price } from "@/app/components/prices";
import { db } from "@/app/lib/db";

import { NextRequest, NextResponse } from "next/server";
const get_last = async (currency:string,state:string,days:number) => {
  let prices: Price[] = [];
  let now = new Date();
  now.setDate(now.getDate() - days);
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  now = new Date();
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
    prices = await db.price.findMany({
      where: {
        state:state,
        name:currency,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    console.log(prices);
   // i = i + 1;
    //now.setDate(now.getDate() - i);
    //startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
 
  return prices;
};
const get_last_mean = async (currency:string,days:number) => {
    let prices: Price[] = [];
    let now = new Date();
    now.setDate(now.getDate() - days);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
      prices = await db.price.findMany({
        where: {
          state:'all',
          name:currency,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
      console.log(prices);

    return prices;
  };
async function handler(req: NextRequest) {
  const { currency,state,days } = await req.json();
  let prices:Price[]=[]
  console.log(state);
  if (!state || !days || !currency) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
  if (state=='all') {
    prices = await get_last(currency,state,days);
  }
  else {
    prices= await get_last_mean(currency,days);
  }
   
  if (prices)
    return NextResponse.json({ ok: true, prices: prices }, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
