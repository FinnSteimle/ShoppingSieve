import type { ReactNode } from "react";

import styles from "./Card.module.css";


interface CardProps {
  children: ReactNode
}


export function Card({ children }: CardProps) {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {children}
      </div>
    </div>
  );
}
