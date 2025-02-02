import { Price } from "@/app/components/prices";
import { db } from "@/app/lib/db";
import { currency} from "@/app/lib/types";

import { NextRequest, NextResponse } from "next/server";
const get_last = async (currency:string) => {
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
        state:'all',
        name:currency,
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
const get_last_currencies = async (currency:string,state:string) => {
    let currencies: currency[] = [];
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
    while (currencies.length == 0 && i < 6) {
      currencies = await db.currency.findMany({
        where: {
          state:state,
          name:currency,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
      console.log(currencies);
      i = i + 1;
      now.setDate(now.getDate() - i);
      startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    return currencies;
  };
async function handler(req: NextRequest) {
  const { currency, state } = await req.json();
  
  console.log(currency);
  if (!currency || !state) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }


    const prices = await get_last(currency);
    const currencies = await get_last_currencies(currency,state)
  
  console.log(prices);
  if (prices)
    return NextResponse.json({ ok: true, prices: prices,currencies:currencies}, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
