import styles from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.image}`}></div>
      <div className={styles.content}>
        <div className={`${styles.skeleton} ${styles.title}`}></div>
        <div className={`${styles.skeleton} ${styles.text} ${styles.w75}`}></div>
        <div className={`${styles.skeleton} ${styles.text} ${styles.w50}`}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
