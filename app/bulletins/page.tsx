import Bulletins from "../components/bulletins";
import Store_Bulletins from "../components/store_bulletins";
import User_Bulletins from "../components/user_bulletins";
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
        <User_Bulletins/>:(session.user.type== 'store') ? <Store_Bulletins/>: <Bulletins/>}
    </>
  );
}
