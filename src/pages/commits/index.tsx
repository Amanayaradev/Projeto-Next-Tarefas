import styles from "../../../styles/Home.module.css";

export default function Header() {
  const handleCommit = (e : boolean) => {
    console.log(e)
    return e;
  }

  return (
      <div className={styles.containerCommit}>
              <div className={styles.boxCommit}>
                <div className={styles.containerCom}>Lorem</div>
              </div>
        <div className={styles.containerCommit}>
          <div className={styles.boxCommitForm}>
            <h1 className={styles.titleCommit}>Deixar comentário</h1>
          <form className={styles.form}>
            <textarea className={styles.textarea} placeholder="Digite seu comentário..."></textarea>
            <button type="submit" className={styles.button} onClick={() => handleCommit(true)}>Eviar comentário</button>
          </form>
          </div>
        </div>
        <div className={styles.task}>
          <ul className={styles.taskList}>
            <li>
              <div className={styles.taskItem}>
                <span className={styles.nameCommit}>name</span>
                <span className={styles.delete}>delete</span>
              </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, modi! Ipsum pariatur harum vel dolor nihil consectetur obcaecati neque atque nulla natus eveniet molestias sequi, ad, laudantium numquam eius vitae!</p>
            </li>
          </ul>
        </div>
      </div>
  );
}
