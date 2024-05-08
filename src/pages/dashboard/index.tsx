import styles from "../../../styles/Home.module.css";

export default function Header() {

  const handlePublic = (e : boolean) => {
    console.log(e)
    return e;
  }

  const handleRegister = (e: object) => {
    console.log(e)
    return e;
  }
  return (
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <div>
          <h1 className={styles.titleTarefa}>Qual sua tarefa?</h1>
          <form className={styles.form}>
            <textarea className={styles.textarea} placeholder="Digite sua tarefa..."></textarea>
            <input type="checkbox" onChange={(e) => handlePublic(true)} />
            <label> Deixar tarefa pública</label>
            <button type="submit" className={styles.button} onClick={(e) => handleRegister(e)}>Registrar</button>
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
