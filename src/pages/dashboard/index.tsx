import { GetServerSideProps, GetStaticProps } from "next";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/src/services/firebaseConnection";
import Link from "next/link";

interface userProps {
  user: {
    email: string;
  }
}

interface Task {
  id: string;
  tarefa: string;
  created: Date;
  user: string;
  public: boolean;
}

export default function Header({user}: userProps) {
  const [inputText, setInputText] = useState("")
  const [checkPublic, setCheckPublic] = useState(false)
  const [task, setTask] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tarefas = collection(db, "tarefas");
        const q = query(tarefas,
          orderBy("created", "desc"),
          where("user", "==", user?.email)
        )

        onSnapshot(q, (snapshot) => {
          let listaTask = [] as Task[];

          snapshot.forEach((doc) => {
            listaTask.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              created: doc.data().created,
              user: doc.data().user,
              public: doc.data().public,
            })
          })
          setTask(listaTask)
        })
      } catch (error) {
        console.error("Erro ao buscar dados da coleção:", error);
      }
    };
  
    // Chame a função fetchData ao montar o componente
    fetchData();
  }, []);
  
  const handleTask = async (e: any) => {
    e.preventDefault()
    if(inputText == "") return;
    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: inputText,
        created: new Date,
        user: user?.email,
        public: checkPublic,
      })
      setInputText("");
      setCheckPublic(false);
      
    } catch (error) {
      
    }
  }

  const handleCopy = async(id:  string) => {
    const tarefaId = task.find((tarefa) => tarefa.id === id)?.tarefa
    try {
      if(tarefaId) {
        navigator.clipboard.writeText(tarefaId)
      }
    } catch (error) {
      console.error('Erro ao copiar texto:', error);
    }
  }

  const handleShare = async(id: string) => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/commits/${id}`)
  }

  const handleDelete = async(id: string) => {
    const docRef = doc(db, "tarefas", id )
    await deleteDoc(docRef)
  }

  return (
      <div className={styles.container}>
        <Head>
          <title>Meu Painel</title>
        </Head>
        <div className={styles.containerForm}>
          <div>
          <h1 className={styles.titleTarefa}>Qual sua tarefa?</h1>
          <form className={styles.form}>
            <textarea className={styles.textarea} placeholder="Digite sua tarefa..."
            value={inputText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
            ></textarea>
            <div>
            <input type="checkbox" checked={checkPublic} onChange={(e: ChangeEvent<HTMLInputElement>) => setCheckPublic(e.target.checked)}/>
            <label> Deixar tarefa pública</label>
            </div>
            <button type="submit" className={styles.button} 
            onClick={(e) => handleTask(e)}
            >Registrar</button>
          </form>
          </div>
        </div>
        <div className={styles.task}>
          <ul className={styles.taskList}>
            {
              task.map((tarefa, index) => (
                <li key={tarefa.id}>
                <div className={styles.taskItem}>
                  {tarefa.public === true ?
                  (
                    <div>
                      <span className={styles.public}>Public</span>
                      <button onClick={() => handleCopy(tarefa.id)} className={styles.share}>Copy</button>
                      <button onClick={() => handleShare(tarefa.id)} className={styles.share}>Share</button>
                      <button onClick={() => handleDelete(tarefa.id)} className={styles.delete}>delete</button>
                    </div>)
                   : (<div>                        <button onClick={() => handleCopy(tarefa.id)} className={styles.share}>Copy</button>
                        <button onClick={() => handleDelete(tarefa.id)} className={styles.delete}>delete</button>
                    </div>)
            }

                </div>
                {
                  tarefa.public === true ? (<Link href={`/commits/${tarefa.id}`}><p>{tarefa.tarefa}</p></Link>)
                : <p>{tarefa.tarefa}</p>
                }
                
              </li>
              ))
            }
          </ul>
        </div>
      </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session = await getSession({req})
  console.log("session", session)
  if(!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {
      user: {
        email: session?.user?.email
      }
    },
  }
}
