"use client";

import { useState, useEffect } from "react";
import About from "./components/about"; // Import About component
import Projects from "./components/projects"; // Import Projects component
import Header from "./components/header"; // Import Header component

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
    return <div>Nur noch 1 Sekunde… okay, vielleicht 3</div>;
  }

  return (
    <div>
      {/* Render the Header component */}
      <Header
        activeSection={activeSection}
        handleNavigation={handleNavigation}
      />
      <main>
        {showAbout ? (
          <About data={data} /> // Pass data to About component
        ) : (
          <Projects
            data={data}
            activeProject={activeProject}
            handleProjectClick={handleProjectClick}
          /> // Pass data and project handling functions to Projects component
        )}
      </main>
    </div>
  );
}
