import styles from "./Style/aboutUs.module.scss";
import ImgquemSomos from "../../../assets/coracaozinho-quebra-cabeca.jpg";

export default function AboutUs() {
  return (
    <div className={styles["about-container"]}>
      <div className={`${styles["title"]} under-title`}>
        <h2>Quem Somos?</h2>
      </div>
      <div className={styles["content"]}>
        <div className={styles["img-part"]}>
          {/* <img src={ImgquemSomos} alt="" /> */}
          <div className={styles["img"]}></div>
        </div>
        <div className={styles["text-part"]}>
          <div className={styles["part1"]}>
            A MONITORE é um aplicativo dedicado as pessoas que fazem controle
            glicêmico. Nele, é possível registrar sua glicemia junto ao horário
            que a medição foi realizada. Além disso, você possui acesso a uma
            tabela de alimentos para facilitar na hora de corrigir sua glicemia.
          </div>

          <div className={styles["part2"]}>
            Os elementos estão dispostos de forma que a interface é limpa e as
            funções são fáceis de identificar. Além disso, as fontes foram
            selecionadas pensando na legibilidade para os usuários com
            dificuldades de visão, assim como as cores foram escolhidas
            visandono conforto do usuário.
          </div>
        </div>
      </div>
    </div>
  );
}
