import Stores from "../components/stores";
import User_Stores from "../components/user_stores";
import { getSession } from "../lib/auth";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await getSession();
  if(!session) {
    redirect('/auth/login');
  }
  return (
    <> 
    {(session.user.type== 'customer' || session.user.type== 'store') ?
    <User_Stores/>: <Stores/> }
    </>
  );
}
