
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {name, state,city,phone,email,address,opening_time,closing_time,working_days} = await req.json()
  console.log(name)

  if(!name || !state || !city || !phone || !email || !address || !opening_time || !closing_time || !working_days){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
  const ex = await db.store.findMany({where:{
    name:name
  }})
     if(ex.length!!=0) {
      return NextResponse.json({message:'Store with this name already exist'},{status:400})
     }
      const refcite = await db.store.create({
        data:{
        name:name,
        state:state,
        city:city,
        phone:phone,
        email:email,
        address:address,
      
        }
      })
      let schedule;
      if(refcite) 
      {
        schedule = await db.schedule.create({
         data:{
          storeid:refcite.id,
          opening_time: opening_time,
          closing_time:closing_time,
          sunday:working_days.sunday,
          monday:working_days.monday,
          tuesday:working_days.tuesday,
          wednesday:working_days.wednesday,
          thursday:working_days.thursday,
          friday:working_days.friday,
          saturday:working_days.saturday,
         }
        })
      }
      if(schedule) return NextResponse.json({ok:true},{status:200})
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
