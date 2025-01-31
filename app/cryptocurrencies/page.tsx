
import Crypto_Prices from "../components/Crypto_Prices";
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
        <Crypto_Prices/>:(session.user.type== 'store') ?  <Crypto_Prices/>: <Crypto_Prices/>}
    </>
  );
}
