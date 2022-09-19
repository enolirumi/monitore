import React from 'react'
import styles from "./Style/BannerLogIn.module.scss"
import imgBanner from "../../../assets/img-login.png"

const BannerLogIn = () => {
    return (
        <div className={styles["img-container"]}>
            <img src={imgBanner} alt=""/>
        </div>
    )
}

export default BannerLogIn
