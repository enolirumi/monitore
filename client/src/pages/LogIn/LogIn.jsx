import React from 'react'
import styles from "./Style/LogIn.module.scss"
import Forms from "../../components/LogIn/Forms/FormsLogIn"
import Banner from "../../components/LogIn/Banner/BannerLogIn"
import LoadingModal from '../../components/LoadingModal/LoadingModal'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { cryptObject, cryptText, decryptObject, decryptText } from "../../Criptografia/Criptografia";

const LogIn = () => {
    const navigate = useNavigate()

    const base_url = import.meta.env.VITE_DBHOST

    const API = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const [email, setEmail] = useState(``)
    const [senha, setSenha] = useState(``)

    const [loading, setLoading] = useState(false)
    const [msgError, setMsgError] = useState(``)

    useEffect(() => {
        if (localStorage.length > 0) {
            navigate(`/home`)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (email == '' || senha == '') {
            setLoading(false)
            return setMsgError('Preencha os campos!')
        }

        try {
            const login = await API.post(`${base_url}/login`, {
                email: email,
                senha: senha
            }).then((res) => {
                return res
            })

            const data = await JSON.parse(login.data)

            localStorage.setItem('Nome', data.sessionNome)
            localStorage.setItem('Sobrenome', data.sessionSobrenome)
            localStorage.setItem('Email', data.sessionEmail)
            localStorage.setItem('Senha', data.sessionSenha)
            localStorage.setItem('nvAcesso', data.sessionnvAcesso)

            navigate(`/home`)
        } catch (err) {
            setLoading(false)
            return setMsgError(err.response.data.msgError)
        }
    }

    return (
        <div className={styles["main"]}>
            <Banner />
            <Forms
                email={email}
                senha={senha}
                setEmail={setEmail}
                setSenha={setSenha}
                handleSubmit={handleSubmit}
                msgError={msgError}
                setMsgError={setMsgError}
            />
            <LoadingModal loading={loading} setLoading={setLoading} />
        </div>
    )
}

export default LogIn
