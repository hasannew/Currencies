
import { db } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server";
async function handler(req: NextRequest) {
   // Check for authorization header
   const authHeader = req.headers.get('authorization');
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
     return NextResponse.json(
       { message: "Unauthorized - Missing or invalid token" },
       { status: 401 }
     );
   }
 
   // Extract the token (remove 'Bearer ' prefix)
   const token = authHeader.split(' ')[1];
   if (!token) {
     return NextResponse.json(
       { message: "Unauthorized - Token not provided" },
       { status: 401 }
     );
   }
  const {username} = await req.json()
  const users = await db.user.findMany({where:{
    username:username
  }})
  if(users.length==0){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
  const userID = users[0].id
 
     let store;
  const ex = await db.user.findMany({where:{
      id:userID,
    
     }})
    if (ex.length!=0)
    {
        if(ex[0].type=='store') {
           store = await db.store.findMany({
            where:{
                userID:userID,
              
               }
           })
        }
    }
        if (store && ex) {
            return NextResponse.json({ok:true,user_profile:ex[0],store_profile:store[0]},{status:200})
         }
         else if (ex) {
            return NextResponse.json({ok:true,user_profile:ex[0]},{status:200})
         }
        console.log(store)   
        console.log(ex)
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
