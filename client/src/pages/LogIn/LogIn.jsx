import React from 'react'
import styles from "./Style/LogIn.module.scss"
import Forms from "../../components/LogIn/Forms/FormsLogIn"
import Banner from "../../components/LogIn/Banner/BannerLogIn"
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LogIn = () => {
    const navigate = useNavigate()

    const base_url = `http://localhost:8080`

    const API = axios.create({
        headers: {
          'Content-Type': 'application/json'
        }
    });

    const [email, setEmail] = useState(``)
    const [senha, setSenha] = useState(``)

    const [msgError, setMsgError] = useState(``)

    useEffect(() => {
        if(localStorage.email != null || localStorage.email != undefined) {
            navigate(`/home`)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(email == '' || senha == '') {
            setMsgError(`Preencha os campos`)
        }

        const login = await API.post(`${base_url}/login`, {
            email: email,
            senha: senha
        }).then((res) => {
            return res
        })

        const data = await JSON.parse(login.data)

        console.log(data)

        localStorage.setItem('Nome', data.sessionNome)
        localStorage.setItem('Sobrenome', data.sessionSobrenome)
        localStorage.setItem('Email', data.sessionEmail)
        localStorage.setItem('Senha', data.sessionSenha)
        localStorage.setItem('nvAcesso', data.sessionnvAcesso)

        navigate(`/home`)
    }

    return (
        <div className={styles["main"]}>
            <Banner/>
            <Forms 
                email={email} 
                senha={senha} 
                setEmail={setEmail} 
                setSenha={setSenha} 
                handleSubmit={handleSubmit} 
                msgError={msgError} 
                setMsgError={setMsgError}/>
        </div>
    )
}

export default LogIn
