import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import group from '../../public/undraw_add_tasks_re_s5yj1.png'

export default function Home() {
  return ( 
    <>
      <Head>
        <title>Tarefas</title>
      </Head>
      <main className={styles.main}>
      <div className={styles.container}>
      <Head>
        <title>Tarefas+ | Organize suas tarefas de forma fácil</title>
      </Head>

        <div className={styles.group}>
          <Image className={styles.imageGroup} alt="Logo Tarefas+" src={group} priority />
        </div>
        <div className={styles.group}>
        <h1 className={styles.title}>
          Sistema feito para você organizar seus estudos e terefas
        </h1>
        </div>
        <div className={styles.boxPosts}>
          <span>+ tantos posts</span>
          <span>+ tantos comentarios</span>
        </div>
    </div>
    </main>

    </>
  );
}
