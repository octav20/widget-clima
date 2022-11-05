import styles from "./Loading.module.css";
//este componente es para mostrar un icono de carga
export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}>
        <div></div>
      </div>
    </div>
  );
}