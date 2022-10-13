import styles from "./Style/aboutUs.module.scss";
import ImgquemSomos from "../../../assets/coracaozinho-quebra-cabeca.jpg";

export default function AboutUs() {
  return (
    <div className={styles["about-container"]}>
      <div className={styles["title"]}>
        <h2>Quem Somos?</h2>
      </div>
      <div className={styles["content"]}>
        <div className={styles["img-part"]}>
          {/* <img src={ImgquemSomos} alt="" /> */}
          <div className={styles["img"]}>

          </div>
        </div>
        <div className={styles["text-part"]}>
         <div className={styles["part1"]}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
         </div>

        <div className={styles["part2"]}>
        Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        </div>
      </div>
    </div>
  );
}
