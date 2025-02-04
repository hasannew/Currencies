import { db } from "@/app/lib/db";
import { Currency } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";
const get_last = async (currency:string,state:string) => {
  let prices: Currency[] = [];
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
    });
    console.log(prices);
    i = i + 1;
    now.setDate(now.getDate() - i);
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  return prices;
};
const get_last_mean = async (currency:string) => {
    let prices: Currency[] = [];
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
async function handler(req: NextRequest) {
  const { currency_base,currency_dest,amount,state} = await req.json();
  let prices1: Currency[] = [];
  let prices2: Currency[] = [];
  let result = 0;
  let curr;
  if (!currency_base || !currency_dest || !amount || !state) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
// Currency symbols and colors mapping
if (currency_dest=='SP' || currency_base=='SP') {
    curr = (currency_base!='SP') ? currency_base:currency_dest;
    if (state!='all') {
        prices1 = await get_last(curr,state);
     }
     else {
        prices1 = await get_last_mean(curr);
        console.log(prices1[0])
     }
     if(prices1.length==0) {
        return NextResponse.json({ message: "Price Not Found"}, { status: 400 });
     }
     if (currency_base=='SP') {
     result = Number((amount/prices1[0].purchase_price).toFixed(2))
    }
     else {
        result = Number((prices1[0].sale_price*amount).toFixed(2))
     }

     
}

else {

    if (state!='all') {
        prices1 = await get_last(currency_base,state);
        prices2 = await get_last(currency_dest,state);
     }
     else {
        prices1 = await get_last_mean(currency_base);
        prices2 = await get_last_mean(currency_dest);
     }
     if(prices1.length==0 || prices2.length==0) {
        return NextResponse.json({ message: "Price Not Found"}, { status: 400 });
     }
   
     result = Number(((prices1[0].sale_price/prices2[0].purchase_price)*amount).toFixed(2))

     
}
  
  
  console.log(result);
  if (result) 
    return NextResponse.json({ ok: true,result:result}, { status: 200 });
  return NextResponse.json({ message: "Error Fetching Assistants"}, { status: 500 });
}

export { handler as POST, handler as GET };
