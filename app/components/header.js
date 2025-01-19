import styles from "../styles/header.module.css"; // Import header styles

export default function Header({ activeSection, handleNavigation }) {
  return (
    <header className="spacingBELarge">
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <a onClick={() => handleNavigation("index")}>Liam Schenk</a>
          </li>
          <li className={styles.listItem}>
            <a
              className={`${
                activeSection === "index" ? styles.active : ""
              } alignCenter`}
              onClick={() => handleNavigation("index")}
            >
              Index
            </a>
          </li>
          <li className={styles.listItem}>
            <a
              className={`${
                activeSection === "about" ? styles.active : ""
              } alignRight`}
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
