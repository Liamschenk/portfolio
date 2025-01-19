import { useEffect, useRef } from "react";
import styles from "../styles/projects.module.css"; // Import projects styles

export default function Projects({ data, activeProject, handleProjectClick }) {
  const slideshowRefs = useRef([]); // Array of refs for each slideshow

  useEffect(() => {
    const headers = document.querySelectorAll(`.${styles.header}`);

    headers.forEach((header, index) => {
      setTimeout(() => {
        header.classList.add(styles.headerActive);
      }, index * 150); // Delay each header's animation
    });
  }, []); // Run once when the component mounts

  // Add drag-to-scroll functionality for slideshows
  useEffect(() => {
    slideshowRefs.current.forEach((slideshow) => {
      let isDragging = false;
      let startX;
      let scrollLeft;

      // Handle mouse start drag event
      const onMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - slideshow.offsetLeft;
        scrollLeft = slideshow.scrollLeft;
        slideshow.classList.add(styles.dragging); // Optional: Add a dragging style
      };

      // Handle mouse move during drag event
      const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slideshow.offsetLeft;
        const walk = (x - startX) * 1; // Adjust scrolling speed
        slideshow.scrollLeft = scrollLeft - walk;
      };

      // Handle mouse end drag event
      const onMouseUp = () => {
        isDragging = false;
        slideshow.classList.remove(styles.dragging); // Optional: Remove dragging style
      };

      // Handle touch start drag event
      const onTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - slideshow.offsetLeft;
        scrollLeft = slideshow.scrollLeft;
        slideshow.classList.add(styles.dragging); // Optional: Add a dragging style
      };

      // Handle touch move during drag event
      const onTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - slideshow.offsetLeft;
        const walk = (x - startX) * 1; // Adjust scrolling speed
        slideshow.scrollLeft = scrollLeft - walk;
      };

      // Handle touch end drag event
      const onTouchEnd = () => {
        isDragging = false;
        slideshow.classList.remove(styles.dragging); // Optional: Remove dragging style
      };

      // Attach mouse event listeners
      slideshow.addEventListener("mousedown", onMouseDown);
      slideshow.addEventListener("mousemove", onMouseMove);
      slideshow.addEventListener("mouseup", onMouseUp);
      slideshow.addEventListener("mouseleave", onMouseUp); // Stop drag if mouse leaves

      // Attach touch event listeners for mobile devices
      slideshow.addEventListener("touchstart", onTouchStart);
      slideshow.addEventListener("touchmove", onTouchMove);
      slideshow.addEventListener("touchend", onTouchEnd);
      slideshow.addEventListener("touchcancel", onTouchEnd); // Stop drag if touch is canceled

      // Cleanup event listeners
      return () => {
        slideshow.removeEventListener("mousedown", onMouseDown);
        slideshow.removeEventListener("mousemove", onMouseMove);
        slideshow.removeEventListener("mouseup", onMouseUp);
        slideshow.removeEventListener("mouseleave", onMouseUp);

        slideshow.removeEventListener("touchstart", onTouchStart);
        slideshow.removeEventListener("touchmove", onTouchMove);
        slideshow.removeEventListener("touchend", onTouchEnd);
        slideshow.removeEventListener("touchcancel", onTouchEnd);
      };
    });
  }, [data]); // Re-run the effect when data changes

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

            {/* Slideshow */}
            <div
              className={`${styles.slideshow} spacingBLarge`}
              ref={(el) => (slideshowRefs.current[index] = el)} // Attach ref
            >
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
