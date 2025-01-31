

import Gold_Prices from "../components/Gold_Prices";
import { getSession } from "../lib/auth";
//import { getSession } from "../lib/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getSession();
  if(!session) {
    redirect('/auth/login');
  }
  return (
    <>
    
    {(session.user.type== 'customer') ?
        <Gold_Prices/>:(session.user.type== 'store') ?   <Gold_Prices/>:  <Gold_Prices/>}
    </>
  );
}
