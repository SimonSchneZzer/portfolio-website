import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useIntersectionObserver = () => {
  const { updateActiveSection } = useApp();

  useEffect(() => {
    let observer;
    let timer;

    const initializeObserver = () => {
      const sections = document.querySelectorAll('section[id]');
      if (!sections.length) {
        timer = setTimeout(initializeObserver, 100);
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: '-45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      };

      const observerCallback = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            updateActiveSection(sectionId);
          }
        });
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);

      sections.forEach(section => observer.observe(section));

      // Set initial active section
      const setInitialActiveSection = () => {
        const scrollPosition = window.scrollY;
        let currentSection = 'hero';

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
          }
        });

        updateActiveSection(currentSection);
      };

      setInitialActiveSection();
    };

    initializeObserver();

    return () => {
      clearTimeout(timer);
      if (observer) {
        document.querySelectorAll('section[id]').forEach(section => {
          observer.unobserve(section);
        });
      }
    };
  }, [updateActiveSection]);
}; 