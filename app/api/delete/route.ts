
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {type,id} = await req.json()
  let stores,bulletins,currencies,prices;
  console.log(type)
  if(!type || !id){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
       //let k = db.store.findMany({ where: {name:name},
        //select: {
        //  name: true
        //},});
        //if (k) 
        if (type=='stores') {
            stores = await db.store.findMany({where:{
                id:id
            }})
            console.log(stores);
            if(stores.length!=0) {
                stores = await db.store.delete({where:{
                    id:id
                }})
                if (stores)  return NextResponse.json({ok:true},{status:200});
                return NextResponse.json({ok:false},{status:400});
            }
            else {
                return NextResponse.json({ok:true},{status:200});
            } 
        }
        else if (type=='bulletins') {
            bulletins = await db.bulletin.findMany({where:{
                id:id
            }})
            console.log(bulletins);
            if(bulletins.length!=0) {
                bulletins = await db.bulletin.delete({where:{
                    id:id
                }})
                if (bulletins) return NextResponse.json({ok:true},{status:200})
                return NextResponse.json({ok:false},{status:400})
            } 
            else return NextResponse.json({ok:true},{status:200})
        }
       else if (type=='currencies') {
        currencies = await db.currency.findMany({where:{
            id:id
        }})
        console.log(currencies);
        if(currencies.length!=0) {
            currencies = await db.currency.delete({where:{
                id:id
            }})
            if (currencies) return NextResponse.json({ok:true},{status:200})
            return NextResponse.json({ok:false},{status:400})
        }
        else {
            return NextResponse.json({ok:true},{status:200})
        }
            
    }
    else if (type=='prices') {
        prices = await db.price.findMany({where:{id:id}})
        console.log(prices);
        if(prices.length!=0) {
            prices = await db.price.delete({where:{id:id}})
            if(prices) return NextResponse.json({ok:true},{status:200})
            return NextResponse.json({ok:false},{status:400})
        }
        else {
            return NextResponse.json({ok:true},{status:200})
        }
    }
     
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
