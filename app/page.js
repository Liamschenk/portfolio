"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Projects from "./components/Projects";
import About from "./components/About";

export default function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState("index");
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    fetch("/content/profile/profile.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading profile.json:", error));
  }, []);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setShowAbout(section === "about");

    // Reset activeProject when navigating to a different section
    if (section !== "projects") {
      setActiveProject(null);
    }
  };

  const handleProjectClick = (index) => {
    setActiveProject(activeProject === index ? null : index);
  };

  if (!data) {
    return <p>Nur noch 1 Sekunde… okay, vielleicht 3</p>;
  }

  return (
    <>
      {/* Render the Header component */}
      <Header
        activeSection={activeSection}
        handleNavigation={handleNavigation}
      />
      <main>
        {showAbout ? (
          // Pass data to About component
          <About data={data} />
        ) : (
          // Pass data and project handling functions to Projects component
          <Projects
            data={data}
            activeProject={activeProject}
            handleProjectClick={handleProjectClick}
          />
        )}
      </main>
    </>
  );
}
