import Currencies from "../components/currencies";
import Store_Currencies from "../components/store_currencies";
import User_Currencies from "../components/user_currencies";
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
    <User_Currencies/>:(session.user.type== 'store') ? <Store_Currencies/>: <Currencies/>}
    </>
  );
}
