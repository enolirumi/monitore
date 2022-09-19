import React from 'react'
import styles from "./Style/FormsLogIn.module.scss"
import { Link } from 'react-router-dom'

const FormsLogIn = ({ senha, setSenha, email, setEmail, handleSubmit, setMsgError, msgError }) => {
    return (
        <div className={styles["form-container"]}>
            <div className={`${styles["error-box"]} ${msgError !== '' ? styles["open"] : ''}`}>
                {msgError}
            </div>
            <form id={styles["forms-logIn"]} onSubmit={(e) => { handleSubmit(e) }}>
                <div className={styles["conteudo-form"]}>
                    <h1>Entrar</h1>
                    <div className={styles["form-inputs"]}>
                        <input type="email" placeholder="E-mail" value={email} onFocus={setMsgError('')} onChange={(e) => { setEmail(e.target.value); }} className={styles["email"]} />
                        <input type="password" placeholder="Senha" value={senha} onFocus={setMsgError('')} onChange={(e) => { setSenha(e.target.value); }} className={styles["senha"]} />
                    </div>
                    <div className={styles["btn-container"]}>
                        <input type="submit" value="Entrar" className={styles["btn-forms"]} />
                        <p>Ainda não possui uma conta? <Link to={'/cadastro'}>Cadastre-se aqui!</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormsLogIn
