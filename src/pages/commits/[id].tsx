import styles from "../../../styles/Home.module.css";
import { ChangeEvent, EventHandler, FormEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where} from "firebase/firestore";
import { db } from "@/src/services/firebaseConnection";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

interface Task {
  item: {
    taskId: string;
    tarefa: string;
    date: Date;
    user: string;
    public: boolean;
},
allComments: CommentsProps[],
}

interface CommentsProps {
    id: string;
    comment: string,
    user: string,
    name: string,
    taskId: string,
}

export default function Commits({item, allComments}: Task) {
  const {data: session} = useSession();

  const [commit, setCommit] = useState("")
  const [comments, setComments] = useState<CommentsProps[]>(allComments || [])

  useEffect(() => {
    const fetchComments = async() => {
      try {
        const q = query(collection(db, "comentarios"), where("taskId", "==", item.taskId))
        
        onSnapshot(q, (snapComments) => {
          let allComments: CommentsProps[] = [];
          snapComments.forEach((doc) => {
            allComments.push({
              id: doc.id,
              comment: doc.data()?.comment,
              user: doc.data()?.user,
              name: doc.data()?.name,
              taskId: doc.data()?.taskId,
            })
        })
        setComments(allComments)
      })
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
  },[])


  const handleComment = async(e: FormEvent) => {
    e.preventDefault()
    if(commit === "") return;
    if(!session?.user?.email || !session?.user?.name) return;

    try {
      //criando a api comentarios
      const docRef = await addDoc(collection(db, "comentarios"), {
        comment: commit,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId,
      })
      console.log(docRef)
      setCommit("")
    } catch (error) {
      console.log(error)
    }
  }

    const handleDelete = async(id: string) => {
      try {
        const docRef = doc(db, "comentarios", id )
        await deleteDoc(docRef)

        const deleted = comments.filter((item) => item.id !== id)
        setComments(deleted)
      } catch (error) {
        console.log(error)
      }
    }

  return (
      <div className={styles.containerCommit}>
        <div className={styles.boxCommit}>
          <h1 className={styles.containerCom}>{item?.tarefa}</h1>
        </div>
        <div className={styles.containerCommit}>
          <div className={styles.boxCommitForm}>
            <h1 className={styles.titleCommit}>Deixar comentário</h1>
          <form onSubmit={handleComment} className={styles.form}>
            <textarea value={commit}
             onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setCommit(event.target.value)
            }
             className={styles.textarea} 
             placeholder="Digite seu comentário..."></textarea>
            <button type="submit" className={styles.button}>Eviar comentário</button>
          </form>
          </div>
        </div>
        <div className={styles.task}>
          <ul className={styles.taskList}>

              {comments.length === 0 && (
                <span>Nenhum comentário foi encontrado...</span>
              )}
              {comments.map((item) => (
                  <article key={item.id} className={styles.comment}>
                    <li>
              <div className={styles.taskItem}>
                <span className={styles.nameCommit}>{item.name}</span>
                <button
                onClick={() => handleDelete(item.id)}
                 className={styles.delete}>delete</button>
              </div>
                    <p>{item.comment}</p>
            </li>
                  </article>
                ))}
          </ul>
        </div>
      </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const id = params?.id as string;
  console.log("id", id)

  const docRef = doc(db, "tarefas", id )
  const tarefa = await getDoc(docRef)

  if(!tarefa?.data() === undefined || !tarefa?.data()?.public) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const task = {
    taskId: tarefa.id,
    tarefa: tarefa.data()?.tarefa,
    user: tarefa.data()?.user,
    date: new Date()?.toLocaleDateString(),
    public: tarefa.data()?.public,
  }
  return {
    props: {
      item: task,
    },
  }
}