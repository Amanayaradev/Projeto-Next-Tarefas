import { GetServerSideProps } from "next";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import { getSession } from "next-auth/react";

export default function Header() {

  return (
      <div className={styles.container}>
        <Head>
          <title>Meu Painel</title>
        </Head>
        <div className={styles.containerForm}>
          <div>
          <h1 className={styles.titleTarefa}>Qual sua tarefa?</h1>
          <form className={styles.form}>
            <textarea className={styles.textarea} placeholder="Digite sua tarefa..."></textarea>
            <div>
            <input type="checkbox" />
            <label> Deixar tarefa pública</label>
            </div>
            <button type="submit" className={styles.button} >Registrar</button>
          </form>
          </div>
        </div>
        <div className={styles.task}>
          <ul className={styles.taskList}>
            <li>
              <div className={styles.taskItem}>
                <span className={styles.public}>Public</span>
                <span className={styles.share}>Share</span>
                <span className={styles.delete}>delete</span>
              </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, modi! Ipsum pariatur harum vel dolor nihil consectetur obcaecati neque atque nulla natus eveniet molestias sequi, ad, laudantium numquam eius vitae!</p>
            </li>
          </ul>
        </div>
      </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({req})
  console.log(session)
  if(!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {},
  }
}