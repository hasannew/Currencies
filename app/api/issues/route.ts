
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
  const {email,topic,message,username} = await req.json()
  const users = await db.user.findMany({where:{
    username:username
  }})
  console.log(email)
  const userID = users[0].id
  console.log(topic)
  if(!email || !userID || !topic || !message){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }
    
     const now = new Date()
      const refcite = await db.issue.create({
        data:{
        email:email,
        userid:userID,
        topic:topic,
        message:message,
        date:now
        }
      })
      if(refcite)return NextResponse.json({ok:true},{status:200})
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
