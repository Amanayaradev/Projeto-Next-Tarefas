import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import group from '../../public/undraw_add_tasks_re_s5yj1.png'
import { GetStaticProps } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

interface LengthProps {
  tamTarefa: number,
  tamCommits: number,
}

export default function Home({  tamTarefa, tamCommits
}: LengthProps) {
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
        <Image className={styles.imageGroup} alt="Descrição da imagem" src={group} priority />
        </div>
        <div className={styles.group}>
        <h1 className={styles.title}>
          Sistema feito para você organizar seus estudos e terefas
        </h1>
        </div>
        <div className={styles.boxPosts}>
          <span>+ {tamTarefa} posts</span>
          <span>+ {tamCommits} comentarios</span>
        </div>
    </div>
    </main>

    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const tarefaRef = collection(db, "tarefas")
  const commitRef = collection(db, "comentarios")

  const tarefa = await getDocs(tarefaRef)
  const commit = await getDocs(commitRef)

  return {
    props: {
      tamTarefa: tarefa.size || 0,
      tamCommits: commit.size || 0,
    },
    revalidate: 60,
  }
}