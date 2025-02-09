
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
  const {userID} = await req.json()

  if(!userID){
    return NextResponse.json({message:'Invalid parameters'},{status:400})
  }

     
      const favorites = await db.favorite.findMany({
       
        where:{
            userid:userID
        }
      })
      if(favorites)return NextResponse.json({ok:true,favorites:favorites},{status:200})
       
        return NextResponse.json({message:'Internal Error'},{status:500})
    }




export {handler as POST, handler as GET };
