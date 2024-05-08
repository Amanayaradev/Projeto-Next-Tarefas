import Image from "next/image";
import {signIn, signOut, useSession} from 'next-auth/react'
import styles from "../../styles/Home.module.css";
import heroImg from '@/public/Tarefas+.svg'
import Link from "next/link";
import { useState } from "react";

export default function Header() {

  const { data: session, status} = useSession();
  console.log(session, status)
  return (
      <header className={styles.header}>
        <div className={styles.tarePainel}>
        <Link href={"/"}>
          <Image alt="logo" src={heroImg} priority></Image>
        </Link>
        {
          session ? (<Link href="/dashboard" className={styles.meuPinel}>Meu Painel</Link>) : <></>
        }
        </div>
        <nav className={styles.nav}>
          {
            session ? (<button onClick={() => signOut()} className={styles.conta}>Olá {session?.user?.name}</button>) : <button onClick={() => signIn("google")} className={styles.conta}>Minha Conta</button>
          }
        </nav>
      </header>
  );
}
