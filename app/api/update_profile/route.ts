
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {username,name, state,city,phone,email,address,opening_time,closing_time,working_days} = await req.json()
  let name1,state1,city1,phone1,email1,address1,opening_time1,closing_time1,working_days1;

  if(!username){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
  const users = await db.user.findMany({where:{
    username:username
  }})
  if(users.length==0){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
  const userID = users[0].id
 
     let store,update,schedule,update2;
 
    if (users.length!=0)
    {
        if(users[0].type=='store') {
           store = await db.store.findMany({
            where:{
                userID:userID,
              
               }
           })
        }
    }
      if(store) {
        schedule = await db.schedule.findMany({where:{
            storeid:store[0].id
        }})
        if(opening_time) {
            opening_time1 = opening_time;
        }
        else {
            opening_time1 = schedule[0].opening_time
        }
        if(closing_time) {
            closing_time1 = closing_time;
        }
        else {
            closing_time1 = schedule[0].closing_time
        }
        if(working_days) {
            working_days1 = working_days
        }
        else {
            working_days1 = {
                sunday:schedule[0].sunday,
                monday:schedule[0].monday,
                tuesday:schedule[0].tuesday,
                wednesday:schedule[0].wednesday,
                thursday:schedule[0].thursday,
                friday:schedule[0].friday,
                saturday:schedule[0].saturday

            }
        }
        if(name) {
            name1 = name;
        }
        else {
            name1 = store[0].name
        }
        if(email) {
            email1 = email;
        }
        else {
            email1 = store[0].email
        }
        if(state) {
            state1 = state;
        }
        else {
            state1 = store[0].state
        }
        if(city) {
            city1 = city;
        }
        else {
            city1 = store[0].city
        }
        if(address) {
            address1 = address;
        }
        else {
            address1 = store[0].address
        }
        if(phone) {
            phone1 = phone;
        }
        else {
            phone1 = store[0].phone
        }
      update2 = await db.schedule.update({where:{
        id:schedule[0].id
      },
    data:{
    opening_time:opening_time1,
    closing_time:closing_time1,
    sunday:working_days1.sunday,
    monday:working_days1.monday,
    tuesday:working_days1.tuesday,
    wednesday:working_days1.wednesday,
    thursday:working_days1.thursday,
    friday:working_days1.friday,
    saturday:working_days1.saturday
    }})
    if (!update2) {
        return NextResponse.json({message:'Error updating schedule'},{status:500})
    }
    update = await db.store.update({where:{
        id:store[0].id
      },
    data:{
    name:name1,
    state:state1,
    city:city1,
    address:address1,
    phone:phone1,
    email:email1
    }})
      }
      else {
        if(email) {
            email1 = email;
        }
        else {
            email1 = users[0].email
        }
        update = await db.user.update({where:{
            id:userID
        },data:{
           email:email1
        }})
      }
      if (update) return NextResponse.json({ok:true},{status:200})
     return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
