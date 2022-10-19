import React from 'react'
import styles from "./Style/BannerLogIn.module.scss"
import imgBanner from "../../../assets/20944859.jpg"

const BannerLogIn = () => {
    return (
        <div className={styles["img-container"]}>
            <img src={imgBanner} alt=""/>
        </div>
    )
}

export default BannerLogIn
