import { useEffect } from "react";
import styles from "../styles/about.module.css"; // Import about styles

export default function About({ data }) {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);

    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add(styles.sectionActive);
      }, index * 150); // Delay each section's animation
    });
  }, []); // Run once when the component mounts

  return (
    <div className={styles.about}>
      <section className={`${styles.section} spacingBLarge`}>
        <h1 className="spacingBSmall">Über</h1>
        <p className={styles.description}>{data.about?.description}</p>
      </section>
      <section className={`${styles.section} spacingBLarge`}>
        <h1 className="spacingBSmall">Kontakt</h1>
        {data.contact?.map((contact, index) => (
          <div key={index} className={styles.sectionGrid}>
            <p>{contact.name}:</p>
            <a href={contact.url}>{contact.handle}</a>
          </div>
        ))}
      </section>
      <section className={`${styles.section} spacingBLarge`}>
        <h1 className="spacingBSmall">Berufserfahrung</h1>
        {data.experience?.map((experience, index) => (
          <div key={index} className={styles.sectionGrid}>
            <p>{experience.timespan}</p>
            <p>{experience.name}</p>
          </div>
        ))}
      </section>
      <section className={`${styles.section} spacingBLarge`}>
        <h1 className="spacingBSmall">Ausbildung</h1>
        {data.education?.map((education, index) => (
          <div key={index} className={styles.sectionGrid}>
            <p>{education.timespan}</p>
            <p>{education.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
