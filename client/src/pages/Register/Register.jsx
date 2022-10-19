import React, { useState } from "react";
import styles from "./Style/Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import { useEffect } from "react";
import {
  cryptObject,
  cryptText,
  decryptObject,
  decryptText,
} from "../../Criptografia/Criptografia";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();

  const base_url = import.meta.env.VITE_DBHOST;

  const API = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordIsVisibleConf, setPasswordIsVisibleConf] = useState(false);
  const [nome, setNome] = useState(``);
  const [email, setEmail] = useState(``);
  const [sobrenome, setSobrenome] = useState(``);
  const [genero, setGenero] = useState("");
  const [senha, setSenha] = useState(``);
  const [nascimento, setNascimento] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate() +
      "T" +
      new Date().getHours() +
      ":" +
      new Date().getMinutes()
  );
  const [confSenha, setConfSenha] = useState(``);

  const [isLoading, setIsLoading] = useState(false);
  const [msgError, setMsgError] = useState(``);

  useEffect(() => {
    console.log(nascimento);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      nome == "" ||
      email == "" ||
      sobrenome == "" ||
      senha == "" ||
      confSenha == "" ||
      genero == ""
    ) {
      setIsLoading(false);
      return setMsgError(`Todos os campos devem estar preenchidos`);
    }

    if (sobrenome.indexOf(` `) !== -1) {
      setIsLoading(false);
      return setMsgError(`Preencha com apenas um sobrenome`);
    }

    if (senha !== confSenha) {
      setIsLoading(false);
      return setMsgError(`Confirmação de senha não é igual a senha`);
    }

    try {
      const registro = await API.post(`${base_url}/register`, {
        cryptedBody: cryptObject({
          nome: nome,
          sobrenome: sobrenome,
          senha: confSenha,
          email: email,
          sexo: genero,
        }),
      }).then((res) => {
        console.log(res);
        return res;
      });
      navigate(`/login`);
    } catch (err) {
      setIsLoading(false);
      return setMsgError(err.response.data.msgError);
    }
  };

  return (
    <div className={styles["body"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["title"]}>Registrar</div>
        <div
          className={`${styles["error-box"]} ${
            msgError !== "" ? styles["open"] : ""
          }`}
        >
          {msgError}
        </div>
        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className={styles["form-inputs"]}>
            <input
              type="text"
              className={styles["name"]}
              placeholder="Nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
              onFocus={(e) => {
                setMsgError(``);
              }}
            />

            <input
              type="text"
              className={styles["idade"]}
              placeholder="Sobrenome"
              min={"0"}
              value={sobrenome}
              onChange={(e) => {
                setSobrenome(e.target.value);
              }}
              onFocus={(e) => {
                setMsgError(``);
              }}
            />

            <input
              type="email"
              className={styles["email"]}
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={(e) => {
                setMsgError(``);
              }}
            />

            <div className={styles["select-custom"]}>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Gênero</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>

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
                {passwordIsVisible ? (
                  <AiOutlineEye id={styles["eye"]} />
                ) : (
                  <AiOutlineEyeInvisible id={styles["eye"]} />
                )}
              </div>
            </div>
            <div className={styles["senha"]}>
              <input
                type={passwordIsVisibleConf ? "text" : "password"}
                placeholder="Confirme sua Senha"
                value={confSenha}
                onFocus={() => setMsgError("")}
                onChange={(e) => {
                  setConfSenha(e.target.value);
                }}
                className={styles["conf-senha"]}
              />
              <div
                className={styles["visible"]}
                onClick={() => setPasswordIsVisibleConf((prevState) => !prevState)}
              >
                {passwordIsVisibleConf ? (
                  <AiOutlineEye id={styles["eye"]} />
                ) : (
                  <AiOutlineEyeInvisible id={styles["eye"]} />
                )}
              </div>
            </div>
          </div>
          <div className={styles["terms"]}>
            <label className={styles["check"]}>
              <input type="checkbox" />
              <span className={styles["checkmark"]}></span>
            </label>
            <p>Aceito os Termos e condições gerais</p>
          </div>
          <div className={styles["btn-container"]}>
            <input
              type="submit"
              value="Registrar"
              className={styles["btn-forms"]}
            />
            <p>
              Já uma conta? <Link to={"/login"}>Entrar</Link>
            </p>
          </div>
        </form>
      </div>
      <LoadingModal isLoading={isLoading} />
    </div>
  );
};

export default Register;
