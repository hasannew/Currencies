import Prices from "../components/prices";
import User_Prices from "../components/user_prices";

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
    {(session.user.type== 'customer' || session.user.type== 'store') ?
    <User_Prices/>:<Prices/>}
    </>
  );
}
