import styles from "./Style/aboutUs.module.scss";
import Cards from "./Cards/cards";
import ControleGlicemia from "../../../assets/Vector.svg";
import PesquisaAlimentos from "../../../assets/Vector (1).svg";
import ControleCarboidratos from "../../../assets/calculator-solid.svg";


export default function AboutUs() {
  const dataAboutUs = [
    {
      class: "card-glicemia",
      img: ControleGlicemia,
      title: "Controle de Glicemia",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. ",
    },
    {
        class: "card-alimentos",
        img: PesquisaAlimentos,
        title: "Pesquisa de Alimentos",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. ",
      },
      {
        class: "card-carboidratos",
        img: ControleCarboidratos,
        title: "Contagem de Carboidratos",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. ",
      },
  ];

  return (
    <section className={styles["container-about-us"]}>
      {dataAboutUs.map((e) => {
        return(
            <>
            <Cards class={e.class} img={e.img} title={e.title} about={e.about} />
            </>
        )
      })}
    </section>
  );
}
