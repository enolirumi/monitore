import { useState } from "react"
import { AiOutlineClose } from 'react-icons/ai'
import styles from "./Style/Alimentos.module.scss"
import axios from "axios"
import Header from '../../components/Header/Header'
import LoadingModal from '../../components/LoadingModal/LoadingModal'

const Alimentos = () => {

    const [pesquisa, setPesquisa] = useState('')
    const [isSeaching, setIsSeaching] = useState(false)
    const [resultados, setResultados] = useState([])
    const [info, setInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const base_url = import.meta.env.VITE_DBHOST

    const API = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    });

    async function pesquisar(e) {
        e.preventDefault()
        setPesquisa(e.target.value)

        if (pesquisa == '') {
            return
        }

        const resultadoPesquisaJSON = await API.get(`${base_url}/alimento/${pesquisa}`).then((res) => {
            return res.data
        })
        const resultadoPesquisa = JSON.parse(resultadoPesquisaJSON)


        setResultados(resultadoPesquisa)
    }

    function teste() {
        console.log(info);
    }

    return (
        <>
            <Header />
            <section className={`${styles['section-pesquisa']}`}>
                <div className={styles["title"]}>
                    <h2>Pesquise os alimentos aqui:</h2>
                </div>
                <form className={`${styles['div-pesquisa']}`}>
                    <input type="text" value={pesquisa} onChange={(e) => { pesquisar(e); }} onFocus={() => setIsSeaching(true)} placeholder="Insira o nome do alimento" />
                    {/* <button type="submit">
                        <AiOutlineSearch />
                    </button> */}
                </form>
                <div className={`${styles['div-resultados']}`}>
                    {resultados.map((e) => {
                        return (
                            pesquisa != '' && isSeaching &&
                            <div key={e.id} className={`${styles['card-alimento']}`} onClick={(ev) => { setPesquisa(e.description.replace(/, /g, ` `)); setInfo(e); setIsSeaching(false); teste() }}>
                                <p>{e.description.replace(/,/g, '')}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className={`${styles['section-alimentoInfo']}`}>
                {info.id != undefined &&
                    <>
                        <div className={`${styles['cardInfo']}`}>
                            <div className={styles[`btn-close`]} onClick={() => setInfo({})}><AiOutlineClose /></div>
                            <ul>
                                <li className={styles["title-food"]}><span>{info.description.replace(/, /g, ` `)}</span></li>
                               <div className={styles["table"]}>
                               <div className={styles["column-01"]}>
                               <li>Quantidade: <span>{info.base_qty}</span> <span>{info.base_unit}</span></li>
                                <li>Valor energético: <span>{typeof info.attributes.energy.kcal == 'number' ? info.attributes.energy.kcal.toFixed(2).replace(`.`, `,`) : info.attributes.energy.kcal} kcal</span> ou <span>{typeof info.attributes.energy.kj == 'number' ? info.attributes.energy.kj.toFixed(2).replace(`.`, `,`) : info.attributes.energy.kj} kj</span></li>
                                <li>Proteínas: <span>{typeof info.attributes.protein.qty == 'number' ? info.attributes.protein.qty.toFixed(2).replace(`.`, `,`) : info.attributes.protein.qty}</span> <span>{info.attributes.protein.unit}</span></li>
                                <li>Carboidratos: <span>{typeof info.attributes.carbohydrate.qty == 'number' ? info.attributes.carbohydrate.qty.toFixed(2).replace(`.`, `,`) : info.attributes.carbohydrate.qty}</span> <span>{info.attributes.carbohydrate.unit}</span></li>
                                <li>Lipídios: <span>{typeof info.attributes.lipid.qty == 'number' ? info.attributes.lipid.qty.toFixed(2).replace(`.`, `,`) : info.attributes.lipid.qty}</span> <span>{info.attributes.lipid.unit}</span></li>
                                <li>Colesterol: <span>{typeof info.attributes.cholesterol.qty == 'number' ? info.attributes.cholesterol.qty.toFixed(2).replace(`.`, `,`) : info.attributes.cholesterol.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                                <li>Sódio: <span>{typeof info.attributes.sodium.qty == 'number' ? info.attributes.sodium.qty.toFixed(2).replace(`.`, `,`) : info.attributes.sodium.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                               <li>Fibras: <span>{typeof info.attributes.fiber.qty == 'number' ? info.attributes.fiber.qty.toFixed(2).replace(`.`, `,`) : info.attributes.fiber.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                               </div>
                               <div className={styles["column-02"]}>
                                <li>Cálcio: <span>{typeof info.attributes.calcium.qty == 'number' ? info.attributes.calcium.qty.toFixed(2).replace(`.`, `,`) : info.attributes.calcium.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                                <li>Magnésio: <span>{typeof info.attributes.magnesium.qty == 'number' ? info.attributes.magnesium.qty.toFixed(2).replace(`.`, `,`) : info.attributes.magnesium.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                                <li>Fósforo: <span>{typeof info.attributes.phosphorus.qty == 'number' ? info.attributes.phosphorus.qty.toFixed(2).replace(`.`, `,`) : info.attributes.phosphorus.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                                <li>Ferro: <span>{typeof info.attributes.iron.qty == 'number' ? info.attributes.iron.qty.toFixed(2).replace(`.`, `,`) : info.attributes.iron.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                                <li>Potássio: <span>{typeof info.attributes.potassium.qty == 'number' ? info.attributes.potassium.qty.toFixed(2).replace(`.`, `,`) : info.attributes.potassium.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                                <li>Cobre: <span>{typeof info.attributes.copper.qty == 'number' ? info.attributes.copper.qty.toFixed(2).replace(`.`, `,`) : info.attributes.copper.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                                <li>Zinco: <span>{typeof info.attributes.zinc.qty == 'number' ? info.attributes.zinc.qty.toFixed(2).replace(`.`, `,`) : info.attributes.zinc.qty}</span> <span>{info.attributes.cholesterol.unit}</span></li>
                               </div>
                               </div>
                            </ul>
                        </div>
                        <div className={`${styles['cardInfo-bg']}`} onClick={() => setInfo({})}></div>
                    </>
                }
            </section>
            <LoadingModal isLoading={isLoading} />
        </>
    )
}

export default Alimentos