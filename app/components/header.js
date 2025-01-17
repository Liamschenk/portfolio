import styles from "../styles/header.module.css";

export default function Header({ activeSection, handleNavigation }) {
  return (
    <header className="spacingBELarge">
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <a onClick={() => handleNavigation("index")}>Liam Schenk</a>
          </li>
          <li className={`${styles.listItem} alignCenter`}>
            <a
              className={activeSection === "index" ? styles.active : ""}
              onClick={() => handleNavigation("index")}
            >
              Index
            </a>
          </li>
          <li className={`${styles.listItem} alignRight`}>
            <a
              className={activeSection === "about" ? styles.active : ""}
              onClick={() => handleNavigation("about")}
            >
              Über
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
