import React from "react";
import styles from "./Style/FormsLogIn.module.scss";
import { Link } from "react-router-dom";
import LoadingModal from "../../LoadingModal/LoadingModal";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const FormsLogIn = ({
  senha,
  setSenha,
  email,
  setEmail,
  handleSubmit,
  setMsgError,
  msgError,
}) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <div className={styles["form-container"]}>
      <form
        id={styles["forms-logIn"]}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles["conteudo-form"]}>
          <h1>Entrar</h1>
          <div
            className={`${styles["error-box"]} ${
              msgError !== "" ? styles["open"] : ""
            }`}
          >
            {msgError}
          </div>
          <div className={styles["form-inputs"]}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onFocus={() => setMsgError("")}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={styles["email"]}
            />
           <div className={styles["senha"]}>
           <input
              type={passwordIsVisible ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onFocus={() => setMsgError("")}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              className={styles["senha-input"]}
            />
            <div
              className={styles["visible"]}
              onClick={() => setPasswordIsVisible((prevState) => !prevState)}
            >
               {passwordIsVisible ? <AiOutlineEye id={styles["eye"]}/> :  <AiOutlineEyeInvisible id={styles["eye"]}/>}
              
            </div>
           </div>
          </div>
          <div className={styles["btn-container"]}>
            <input
              type="submit"
              value="Entrar"
              className={styles["btn-forms"]}
            />
            <p>
              Ainda não possui uma conta?{" "}
              <Link to={"/cadastro"}>Cadastre-se aqui!</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormsLogIn;
