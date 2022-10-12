import React from 'react'
import styles from './Style/banner.module.scss'

export default function banner() {
  return (
    <div className={styles["div-img"]}>
   <h1 className={styles["text-box"]}>
       <div className={styles["primary-text"]}>
          MONITORE!
       </div>
       <div className={styles["second-text"]}>
           O jeito mais fácil de monitorar sua saúde
       </div>
   </h1>
</div>
  )
}
