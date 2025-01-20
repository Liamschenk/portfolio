import { useEffect, useRef } from "react";
import styles from "../styles/projects.module.css";

export default function DraggableSlideshow({ attachments }) {
  const slideshowRef = useRef(null);

  useEffect(() => {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDragStart = (e) => {
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX;
      scrollLeft = slideshowRef.current.scrollLeft;
      slideshowRef.current.classList.add(styles.dragging);
    };

    const handleDragMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      const walk = (x - startX) * 1; // Adjust scroll speed
      slideshowRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleDragEnd = () => {
      isDragging = false;
      slideshowRef.current.classList.remove(styles.dragging);
    };

    const currentSlideshow = slideshowRef.current;

    if (currentSlideshow) {
      currentSlideshow.addEventListener("mousedown", handleDragStart);
      currentSlideshow.addEventListener("mousemove", handleDragMove);
      currentSlideshow.addEventListener("mouseup", handleDragEnd);
      currentSlideshow.addEventListener("mouseleave", handleDragEnd);

      currentSlideshow.addEventListener("touchstart", handleDragStart);
      currentSlideshow.addEventListener("touchmove", handleDragMove);
      currentSlideshow.addEventListener("touchend", handleDragEnd);
      currentSlideshow.addEventListener("touchcancel", handleDragEnd);
    }

    // Cleanup event listeners
    return () => {
      if (currentSlideshow) {
        currentSlideshow.removeEventListener("mousedown", handleDragStart);
        currentSlideshow.removeEventListener("mousemove", handleDragMove);
        currentSlideshow.removeEventListener("mouseup", handleDragEnd);
        currentSlideshow.removeEventListener("mouseleave", handleDragEnd);

        currentSlideshow.removeEventListener("touchstart", handleDragStart);
        currentSlideshow.removeEventListener("touchmove", handleDragMove);
        currentSlideshow.removeEventListener("touchend", handleDragEnd);
        currentSlideshow.removeEventListener("touchcancel", handleDragEnd);
      }
    };
  }, []);

  return (
    <div ref={slideshowRef} className={`${styles.slideshow} spacingBLarge`}>
      {attachments?.map((attachment, index) =>
        attachment.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={attachment.url}
            alt={`Project image ${index + 1}`}
          />
        ) : attachment.type === "video" ? (
          <video key={index} autoPlay muted loop playsInline>
            <source src={attachment.url} type="video/mp4" />
          </video>
        ) : null
      )}
    </div>
  );
}
