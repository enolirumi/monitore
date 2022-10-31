import { Link, useNavigate } from 'react-router-dom'
import './Styles/Header.scss'
import ImgLogo from "../../assets/imgLogo.svg"
import { useState } from "react"

const Header = () => {

    const navigate = useNavigate()
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    function logout() {
        localStorage.clear();
        navigate('/')
    }


    return (
        // <header className={``}>
        //     <div className={styles["img"]}>
        //     <img src={ImgLogo} alt="" onClick={() => navigate(`/`)}/>

        //     </div>
        //     <nav>
        //         <ul>
        //             <a onClick={() => navigate('/')}><li>Início</li></a>
        //             <a onClick={() => navigate('/alimentos')}><li>Buscar Alimentos</li></a>
        //         </ul>
        //     </nav>
        //    {localStorage.length > 0 &&
        //         <div className={styles['modal']}>
        //             <h3>Olá, <span>{localStorage.getItem('Nome')}</span></h3>
        //             <a className={styles['btn-sair']} onClick={() => { logout() }}>Sair</a>
        //         </div>
        //     }
        //     {localStorage.length == 0 &&
        //         <div className={styles['container-login-register-btn']}>
        //             <Link to='/login' className={styles['btn-unlogged']} >Logar</Link>
        //             <Link to='/cadastro' className={styles['btn-unlogged']}>Cadastrar</Link>
        //         </div>
        //     }
        // </header>
        <nav className="navigation">
      <a href="/" className="brand-name">
      <img src={ImgLogo} alt="" onClick={() => navigate(`/`)}/>
      </a>
      <button className="hamburger"  onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }>
        <ul>
            <div className="links">
              <a onClick={() => navigate('/')}><li>Início</li></a>
              <a onClick={() => navigate('/alimentos')}><li>Buscar Alimentos</li></a>
            </div>
             {localStorage.length > 0 &&
                <div className='modal'>
                    <h3>Olá, <span>{localStorage.getItem('Nome')}</span></h3>
                    <a className='btn-sair' onClick={() => { logout() }}>Sair</a>
                </div>
            }
              {localStorage.length == 0 &&
                <div className='container-login-register-btn'>
                    <Link to='/login' className='btn-unlogged' >Logar</Link>
                    <Link to='/cadastro' className='btn-unlogged'>Cadastrar</Link>
                </div>
            }
        </ul>
        
          
      </div>
    </nav>
    )
}

export default Header