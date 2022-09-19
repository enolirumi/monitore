import { useNavigate } from 'react-router-dom'
import styles from './Styles/Header.module.scss'

const Header = () => {

    const navigate = useNavigate()

    function logout() {
        localStorage.clear();
        navigate('/')
    }

    return (
        <header className={``}>
            <h1>Monitore</h1>
            <h3>Olá, <span>{localStorage.getItem('Nome')}</span></h3>
            <a onClick={() => { logout() }}>Sair</a>
        </header>
    )
}

export default Header