import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../styles/about.module.css";

export default function About({ data }) {
  //Trigger staggered animation
  useEffect(() => {
    const hiddenSections = document.querySelectorAll(
      `.${styles.hiddenSection}`
    );

    hiddenSections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add(styles.visibleSection);
        section.classList.remove(styles.hiddenSection);
      }, index * 150); // Delay each section's animation
    });
  }, []); // Run once when the component mounts

  return (
    <div className={styles.about}>
      {/* About Section */}
      <section className={`${styles.hiddenSection} spacingBLarge`}>
        <h1 className="spacingBSmall">{data.about?.title}</h1>
        <ReactMarkdown className={styles.description}>
          {data.about?.description}
        </ReactMarkdown>
      </section>

      {/* Contact Section */}
      <section className={`${styles.hiddenSection} spacingBLarge`}>
        <h1 className="spacingBSmall">{data.contact?.title}</h1>
        {data.contact?.entries.map((contact, index) => (
          <div key={index} className={styles.gridSection}>
            <p>{contact.name}:</p>
            <a href={contact.url} target="_blank" className={styles.link}>
              {contact.handle}
            </a>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className={`${styles.hiddenSection} spacingBLarge`}>
        <h1 className="spacingBSmall">{data.experience?.title}</h1>
        {data.experience?.entries.map((experience, index) => (
          <div key={index} className={styles.gridSection}>
            <p>{experience.timespan}</p>
            <p>{experience.name}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className={`${styles.hiddenSection} spacingBLarge`}>
        <h1 className="spacingBSmall">{data.education?.title}</h1>
        {data.education?.entries.map((education, index) => (
          <div key={index} className={styles.gridSection}>
            <p>{education.timespan}</p>
            <p>{education.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
