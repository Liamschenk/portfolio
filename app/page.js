"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState("index");
  const [activeProject, setActiveProject] = useState(null);

  // Fetch profile.json data
  useEffect(() => {
    fetch("/content/profile/profile.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Handle navigation between sections
  const handleNavigation = (section) => {
    setActiveSection(section);
    setShowAbout(section === "about");
    setActiveProject(null); // Reset the active project when switching views
  };

  // Handle project accordion toggling
  const handleProjectClick = (index) => {
    setActiveProject(activeProject === index ? null : index);
  };

  // Staggered fade-in for About and Projects sections
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showAbout || activeSection === "index") {
        const sections = document.querySelectorAll(".section, .project-header");

        sections.forEach((section, index) => {
          setTimeout(() => {
            section.classList.add("active");
          }, index * 150); // Delay each section by 150ms
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId); // Cleanup the timeout when component unmounts
  }, [showAbout, activeSection]); // Run this effect when showAbout or activeSection changes

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <a onClick={() => handleNavigation("index")}>Liam Schenk</a>
        <a
          className={activeSection === "index" ? styles.active : ""}
          onClick={() => handleNavigation("index")}
        >
          Index
        </a>
        <a
          className={activeSection === "about" ? styles.active : ""}
          onClick={() => handleNavigation("about")}
        >
          Über
        </a>
      </header>
      <main>
        {showAbout ? (
          <div className="about">
            <section className="section about-section">
              <h1>Über</h1>
              <p>{data.about?.description}</p>
            </section>
            <section className="section contact-section">
              <h1>Kontakt</h1>
              {data.contact?.map((contact, index) => (
                <p key={index}>
                  {contact.name}: <a href={contact.url}>{contact.handle}</a>
                </p>
              ))}
            </section>
            <section className="section experience-section">
              <h1>Berufserfahrung</h1>
              {data.experience?.map((experience, index) => (
                <div key={index}>
                  <p>{experience.timespan}</p>
                  <p>{experience.name}</p>
                </div>
              ))}
            </section>
            <section className="section education-section">
              <h1>Ausbildung</h1>
              {data.education?.map((education, index) => (
                <div key={index}>
                  <p>{education.timespan}</p>
                  <p>{education.name}</p>
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="projects">
            {/* Always render all projects */}
            {data.projects?.map((project, index) => (
              <div key={index}>
                {/* Project Header */}
                <section
                  className="project-header"
                  onClick={() => handleProjectClick(index)}
                >
                  <p>{String(index + 1).padStart(2, "0")}</p>
                  <p>{project.name}</p>
                  <p>{project.timespan}</p>
                </section>

                {/* Project Content - Accordion functionality */}
                <div
                  className={`project-content ${
                    activeProject === index ? "open" : ""
                  }`}
                >
                  <div className="project-description">
                    <p>{project.description}</p>
                  </div>
                  <div className="project-slideshow">
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
        )}
      </main>
    </div>
  );
}
