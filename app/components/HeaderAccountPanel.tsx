import { getSession, logout } from "@/app/lib/auth";
import styles from "./styles/header.module.css";

export async function HeaderAccountPanel() {
  const session = await getSession();
  console.log(session);
  return (
    <>
      {session ? (
        <form className={styles.account} action={logout}>
          <h1 className={styles.accountAvatar}>{session.user.username[0]}</h1>
          <button className={styles.logout} type="submit">
            Logout
          </button>
        </form>
      ) : (
        <div className={styles.account}>
          <a className={styles.login_control} href="/auth/login">
            Login
          </a>
          <a className={styles.login_control} href="/auth/register">
            Register
          </a>
        </div>
      )}
    </>
  );
}
