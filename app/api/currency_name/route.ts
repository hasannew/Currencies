import { Price } from "@/app/components/prices";
import { db } from "@/app/lib/db";
import { currency} from "@/app/lib/types";

import { NextRequest, NextResponse } from "next/server";
const get_last = async (currency:string,scale: 'Highest' | 'Lowest') => {
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
      orderBy: {
        purchase_price: scale === 'Highest' ? 'desc' : 'asc'
      }
    });
    console.log(prices);
    i = i + 1;
    now.setDate(now.getDate() - i);
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  return prices;
};
const get_last_state = async (currency:string,state:string,scale: 'Highest' | 'Lowest') => {
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
        state:state,
        name:currency,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        purchase_price: scale === 'Highest' ? 'desc' : 'asc'
      }
    });
    console.log(prices);
    i = i + 1;
    now.setDate(now.getDate() - i);
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  return prices;
};
const get_last_currencies = async (currency:string,state:string,scale: 'Highest' | 'Lowest') => {
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
        orderBy: {
          purchase_price: scale === 'Highest' ? 'desc' : 'asc'
        }
      });
      console.log(currencies);
      i = i + 1;
      now.setDate(now.getDate() - i);
      startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    return currencies;
  };
 
async function handler(req: NextRequest) {
  const { currency, state, scale } = await req.json();
  
  console.log(currency);
  if (!currency || !state || !scale) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }


    const mean_prices = await get_last(currency,scale);
    const state_prices = await get_last_state(currency,state,scale)
    const currencies = await get_last_currencies(currency,state,scale)
  
  console.log(mean_prices);
  if (mean_prices)
    return NextResponse.json({ ok: true, mean_prices: mean_prices,state_currencies:currencies,state_prices:state_prices}, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
