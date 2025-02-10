
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
  
  const {username,name, state,city,phone,email,address} = await req.json()
  let name1,state1,city1,phone1,email1,address1;

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
 
     let store,update;
 
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
