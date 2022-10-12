import React from 'react'
import styles from './Style/cards.module.scss'

export default function cards(props) {
  return (
    <div className={styles[props.class]}>
        <div className={styles["icon-part"]}>
            <div className={styles["icon-ball"]}>
            <img src={props.img} alt="" style={{ fill: 'blue'}}/>
            </div>
        </div>
        <div className={styles["text-part"]}>
                <div className={styles["title"]}>
                    {props.title}
                </div>
                <div className={styles["text-about"]}>
                    {props.about}
                </div>
        </div>
      </div>
  )
}
