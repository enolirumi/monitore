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
        "Registre a glicemia sempre que quiser em sua própria agenda. É possível ainda especificar o horário da medição, a refeição consumida e quantidade de medicação usada para a correção da glicemia.",
    },
    {
        class: "card-alimentos",
        img: PesquisaAlimentos,
        title: "Pesquisa de Alimentos",
        about:
          "Procurando facilitar a correção da glicemia para aqueles que realizam dieta e/ou controle de carboidratos, uma uma tabela foi montada com informações nutricionais dos alimentos. ",
      },
      {
        class: "card-carboidratos",
        img: ControleCarboidratos,
        title: "Contagem de Carboidratos",
        about:
          "A Contagem de Carboidratos é baseada na proposta da alimentação saudável, na qual devem ser utilizados todos os grupos de alimentos, fornece noções básicas sobre os alimentos.",
      },
  ];

  return (
    <section className={styles["container-our-skills"]}>
      <div className={`${styles["title"]} under-title`}>
         <h2>O que proporcionamos?</h2>
      </div>
      <div className={styles["cards"]}>
      {dataAboutUs.map((e) => {
        return(
            <>
            <Cards class={e.class} img={e.img} title={e.title} about={e.about} />
            </>
        )
      })}
      </div>
    </section>
  );
}
