
import { useEffect, useState } from 'react';

interface SectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useSectionObserver = (options: SectionObserverOptions = {}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  
  useEffect(() => {
    const { threshold = 0.3, rootMargin = '-10% 0px -10% 0px' } = options;
    
    const sections = [
      'home',
      'features', 
      'services',
      'products',
      'projects',
      'website-projects',
      'web-applications',
      'auth',
      'contact'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sections.includes(sectionId)) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // مراقبة جميع الأقسام
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSection;
};
