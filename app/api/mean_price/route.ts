import { Price } from "@/app/components/prices";
import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const get_last = async (currency_name:string) => {
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
        name:currency_name,
        state:'all',
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    console.log(prices);
    i = i + 1;
    now.setDate(now.getDate() - i);
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  return prices;
};

async function handler(req: NextRequest) {
  const { currency_name } = await req.json();
  console.log(currency_name);
  if (!currency_name) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }


    const prices = await get_last(currency_name);
 
  
  console.log(prices);
  if (prices)
    return NextResponse.json({ ok: true, prices: prices }, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
