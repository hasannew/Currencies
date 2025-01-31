import { Price } from "@/app/components/prices";
import { getSession } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
const get_last = async () => {
  const prices: Price[] = [];
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
    const prices = await db.price.findMany({
      where: {
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
  const { type } = await req.json();
  const session = await getSession();
  const username = session?.user.username;
  let stores, bulletins, currencies, prices, store;
  console.log(type);
  if (!type || !username) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
  // let  now = new Date();
  // let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //let endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const userID = await db.user.findMany({
    where: {
      username: username,
    },
  });
  if (userID) {
    store = await db.store.findMany({
      where: {
        userID: userID[0].id,
      },
    });
  }
  if (!store)
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  if (type == "stores") {
    stores = await db.store.findMany();
    console.log(stores);
    if (stores)
      return NextResponse.json({ ok: true, stores: stores }, { status: 200 });
  } else if (type == "bulletins") {
    bulletins = await db.bulletin.findMany({
      where: {
        storeid: store[0].id,
      },
    });
    console.log(bulletins);
    if (bulletins)
      return NextResponse.json(
        { ok: true, bulletins: bulletins },
        { status: 200 }
      );
  } else if (type == "currencies") {
    currencies = await db.currency.findMany({
      where: {
        store_name: store[0].name,
      },
    });
    console.log(currencies);
    if (currencies)
      return NextResponse.json(
        { ok: true, currencies: currencies },
        { status: 200 }
      );
  } else if (type == "prices") {
    prices = await get_last();
  }
  console.log(prices);
  if (prices)
    return NextResponse.json({ ok: true, prices: prices }, { status: 200 });
  return NextResponse.json({ message: "Internal Error" }, { status: 500 });
}

export { handler as POST, handler as GET };
