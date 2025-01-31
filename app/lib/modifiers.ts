import { db } from "@/app/lib/db";
import { Price } from "../components/prices";
export const mean_price = async(currency:string) =>{
let prices: Price[] = [];
let price_all: Price[] = [];
let price: Price;
let sale_percentageChange = 0,purchase_percentageChange = 0;
  let i = 0;
  let now = new Date();
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
  let sale_mean = 0,
  sum1 = 0,
  purchase_mean = 0,
  sum2 = 0;
for (const p of prices) {
  if (typeof p.sale_price == 'number' && typeof p.purchase_price == 'number') {
  sum1 = sum1 + p.sale_price;
  sum2 = sum2 + p.purchase_price; } 
}
sale_mean = sum1 / prices.length;
purchase_mean = sum2 / prices.length;

startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
price_all = await db.price.findMany({where:
    {state:'all',
        date: {
            gte: startOfDay,
            lte: endOfDay,
          },
    }
})
now = new Date();
if (price_all.length!=0) {
    sale_percentageChange = (typeof price_all[0].purchase_price === 'number' && typeof price_all[0].sale_price === 'number') ?
    (100 * (sale_mean - price_all[0].sale_price)) / sale_mean:0;
  purchase_percentageChange = (typeof price_all[0].purchase_price === 'number' && typeof price_all[0].sale_price === 'number') ?
    (100 * (purchase_mean - price_all[0].purchase_price)) /
    purchase_mean:0;
price = await db.price.update({
    where: {
      id: price_all[0].id,
    },
    data: {
      date: now,
      sale_price: Number(sale_mean.toFixed(2)),
      purchase_price: Number(purchase_mean.toFixed(2)),
      purchase_percentageChange: Number(purchase_percentageChange.toFixed(2)),
      sale_percentageChange: Number(sale_percentageChange.toFixed(2)),
    },
  });
} 
else {
    sale_percentageChange = 
    (100 * (sale_mean - 0)) / sale_mean;
  purchase_percentageChange = 
    (100 * (purchase_mean - 0)) /
    purchase_mean;
price = await db.price.create({
    data: {
        name:currency,
        state:'all',
        city:'all',

      date: now,
      sale_price: Number(sale_mean.toFixed(2)),
      purchase_price: Number(purchase_mean.toFixed(2)),
      purchase_percentageChange: Number(purchase_percentageChange.toFixed(2)),
      sale_percentageChange: Number(sale_percentageChange.toFixed(2)),
    },
  });
}
if (price) {
    return true
}
else {
    return false
}
}

// States

export const mean_state_price = async(currency:string,state:string) =>{
    let prices: Price[] = [];
    let price_all: Price[] = [];
    let price: Price;
    let sale_percentageChange = 0,purchase_percentageChange = 0;
      let i = 0;
      let now = new Date();
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
            name:currency,
            state:state,
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
      let sale_mean = 0,
      sum1 = 0,
      purchase_mean = 0,
      sum2 = 0;
    for (const p of prices) {
      if (typeof p.sale_price == 'number' && typeof p.purchase_price == 'number') {
      sum1 = sum1 + p.sale_price;
      sum2 = sum2 + p.purchase_price; } 
    }
    sale_mean = sum1 / prices.length;
    purchase_mean = sum2 / prices.length;
    
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    price_all = await db.price.findMany({where:
        {state:state,
            date: {
                gte: startOfDay,
                lte: endOfDay,
              },
        }
    })
    now = new Date();
    if (price_all.length!=0) {
        sale_percentageChange = (typeof price_all[0].purchase_price === 'number' && typeof price_all[0].sale_price === 'number') ?
        (100 * (sale_mean - price_all[0].sale_price)) / sale_mean:0;
      purchase_percentageChange = (typeof price_all[0].purchase_price === 'number' && typeof price_all[0].sale_price === 'number') ?
        (100 * (purchase_mean - price_all[0].purchase_price)) /
        purchase_mean:0;
    price = await db.price.update({
        where: {
          id: price_all[0].id,
        },
        data: {
          date: now,
          sale_price: Number(sale_mean.toFixed(2)),
          purchase_price: Number(purchase_mean.toFixed(2)),
          purchase_percentageChange: Number(purchase_percentageChange.toFixed(2)),
          sale_percentageChange: Number(sale_percentageChange.toFixed(2)),
        },
      });
    } 
    else {
        sale_percentageChange = 
        (100 * (sale_mean - 0)) / sale_mean;
      purchase_percentageChange = 
        (100 * (purchase_mean - 0)) /
        purchase_mean;
    price = await db.price.create({
        data: {
            name:currency,
            state:state,
            city:'all',
    
          date: now,
          sale_price: Number(sale_mean.toFixed(2)),
          purchase_price: Number(purchase_mean.toFixed(2)),
          purchase_percentageChange: Number(purchase_percentageChange.toFixed(2)),
          sale_percentageChange: Number(sale_percentageChange.toFixed(2)),
        },
      });
    }
    if (price) {
        return true
    }
    else {
        return false
    }
    }