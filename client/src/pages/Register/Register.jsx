import React, { useState } from "react";
import styles from "./Style/Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()

  const base_url = 'http://localhost:8080'

  const API = axios.create({
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const [nome, setNome] = useState(``)
  const [email, setEmail] = useState(``)
  const [sobrenome, setSobrenome] = useState(``)
  const [senha, setSenha] = useState(``)
  const [confSenha, setConfSenha] = useState(``)

  const [msgError, setMsgError] = useState(``)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(nome == '', email == '', sobrenome == '', senha == '', confSenha == '') {
      return setMsgError(`Todos os campos devem estar preenchidos`)
    }

    if(sobrenome.indexOf(` `) !== -1) {
      return setMsgError(`Preencha com apenas um sobrenome`)
    }
 
    if(senha !== confSenha) {
      return setMsgError(`Confirmação de senha não é igual a senha`)
    }

    const registro = await API.post(`${base_url}/register`, {
      nome: nome,
      sobrenome: sobrenome,
      senha: confSenha,
      email: email
    }).then((res) => {
      console.log(res)
      return res
    })

    navigate(`/`)
  }

  return (
    <div className={styles["body"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["title"]}>Registrar</div>
        <div className={`${styles["error-box"]} ${msgError !== '' ? styles["open"] : ''}`}>
          {msgError}
        </div>
        <form action="" onSubmit={(e) => { handleSubmit(e) }}>
          <div className={styles["form-inputs"]}>
            <input
              type="text"
              className={styles["name"]}
              placeholder="Nome" value={nome}
              onChange={(e) => { setNome(e.target.value) }}
              onFocus={(e) => {setMsgError(``)}}
            />

            <input
              type="text"
              className={styles["idade"]}
              placeholder="Sobrenome"
              min={'0'}
              value={sobrenome}
              onChange={(e) => { setSobrenome(e.target.value) }}
              onFocus={(e) => {setMsgError(``)}}
            />

            <input
              type="email"
              className={styles["email"]}
              placeholder="E-mail"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              onFocus={(e) => {setMsgError(``)}}
            />

            <div className={styles["select-custom"]}>
              <select>
                <option value="">Gênero</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="A">Outro</option>
              </select>
            </div>
            <input
              type="password"
              className={styles["senha"]}
              placeholder="Senha"
              value={senha}
              onChange={(e) => { setSenha(e.target.value), setMsgError(``) }}
              onFocus={(e) => {setMsgError(``)}}
            />

            <input
              type="password"
              className={styles["conf-senha"]}
              placeholder="Confirme sua Senha"
              value={confSenha}
              onChange={(e) => { setConfSenha(e.target.value) }}
              onFocus={(e) => {setMsgError(``)}}
            />
          </div>
          <div className={styles["terms"]}>
            <label className={styles["check"]}>
              <input type="checkbox" />
              <span className={styles["checkmark"]}></span>
            </label>
            <p>Aceito os Termos e condições gerais</p>
          </div>
          <div className={styles["btn-container"]}>
            <input type="submit" value="Registrar" className={styles["btn-forms"]} />
            <p>
              Já uma conta?{" "}
              <Link to={"/"}>Entrar</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
