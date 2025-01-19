import { useEffect } from "react";
import styles from "../styles/projects.module.css"; // Import projects styles

export default function Projects({ data, activeProject, handleProjectClick }) {
  useEffect(() => {
    const headers = document.querySelectorAll(`.${styles.header}`);

    headers.forEach((header, index) => {
      setTimeout(() => {
        header.classList.add(styles.headerActive);
      }, index * 150); // Delay each header's animation
    });
  }, []); // Run once when the component mounts

  return (
    <div>
      {data.projects?.map((project, index) => (
        <div key={index}>
          {/* Project Header */}
          <section
            className={`${styles.header} spacingBRegular`}
            onClick={() => handleProjectClick(index)}
          >
            <p>{String(index + 1).padStart(2, "0")}</p>
            <p>{project.name}</p>
            <p className="alignRight">{project.timespan}</p>
          </section>

          {/* Project Content - Accordion functionality */}
          <div
            className={`${styles.content} ${
              activeProject === index ? styles.contentOpen : ""
            }`}
          >
            <div className={`${styles.description} spacingBELarge`}>
              <p>{project.description}</p>
            </div>
            <div className={`${styles.slideshow} spacingBLarge`}>
              {project.attachments?.map((attachment, index) =>
                attachment.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index}
                    src={attachment.url}
                    alt={`Project image ${index + 1}`}
                  />
                ) : attachment.type === "video" ? (
                  <video key={index} controls>
                    <source src={attachment.url} type="video/mp4" />
                  </video>
                ) : null
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
