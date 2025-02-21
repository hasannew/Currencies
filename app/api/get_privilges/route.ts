

import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const { type} = await req.json();
  

  if (!type) {
    return NextResponse.json(
      { message: "Invalid parameters" },
      { status: 400 }
    );
  }
// Currency symbols and colors mapping
const res = {
    'Add': { users: 'admin, assistants', details: 'Add New Stores' },
    'Delete': { users: 'admin, assistants', details: 'Delete Exisiting Stores' },
    'Update': { users: 'admin, assistants', details: 'Update Exisiting Stores' },
    'Add Bulletins': { users: 'admin, assistants,stores', details: 'Add New Bulletins' },
    'Update Bulletins': { users: 'admin, assistants,stores', details: 'Update Existing Bulletins' },
    'Delete Bulletins': { users: 'admin', details: 'Update Existing Bulletins' },  
    'Public': { users: 'user', details: 'View Prices and Changes' },  
};

  
  
  console.log(res);
  if (res) 
    return NextResponse.json({ ok: true,privilges:res}, { status: 200 });
  return NextResponse.json({ message: "Error Fetching Assistants"}, { status: 500 });
}

export { handler as POST, handler as GET };
