import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import DraggableSlideshow from "../components/DraggableSlideshow";
import styles from "../styles/projects.module.css";

export default function Projects({ data, activeProject, handleProjectClick }) {
  const slideshowRefs = useRef([]); // Array of refs for each slideshow

  //Trigger staggered animation
  useEffect(() => {
    const hiddenProjects = document.querySelectorAll(
      `.${styles.hiddenProject}`
    );

    hiddenProjects.forEach((project, index) => {
      setTimeout(() => {
        project.classList.add(styles.visibleProject);
        project.classList.remove(styles.hiddenProject);
      }, index * 150); // Delay each project's animation
    });
  }, []); // Run once when the component mounts

  return (
    <>
      {data.projects.entries?.map((project, index) => (
        <div key={index}>
          {/* Project Header */}
          <section
            className={`${styles.projectHeader} ${styles.hiddenProject} spacingBRegular`}
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
            {/* Use ReactMarkdown to render Markdown description */}
            <div className={`${styles.description} spacingBELarge`}>
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </div>

            {/* Draggable Slideshow */}
            <DraggableSlideshow
              attachments={project.attachments}
              ref={(el) => (slideshowRefs.current[index] = el)} // Attach ref
            />
          </div>
        </div>
      ))}
    </>
  );
}
