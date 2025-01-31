
import { db } from "@/app/lib/db";

async function handler(req: Request) {
  
  const {name} = await req.json()
  console.log(name)
  if(!name){
    return Response.json({message:'Invalid parameters'},{status:400})
  }
  
      const refcite = await db.employees.create({
        data:{
        first_name:name,
        last_name:name,
        email:name
        }
      })
      if(refcite)return Response.json({ok:true},{status:200})
       
        return Response.json({message:'Invalid request'},{status:300})
    }




export {handler as POST, handler as GET };
