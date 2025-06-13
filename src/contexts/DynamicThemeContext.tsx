
import React, { createContext, useContext, useEffect } from 'react';
import { useSectionObserver } from '@/hooks/useSectionObserver';

interface SectionColors {
  primary: string;
  secondary: string;
  background: string;
}

const sectionThemes: Record<string, SectionColors> = {
  home: {
    primary: '#FFFFFF',     // أبيض
    secondary: '#C0C0C0',   // فضي
    background: '#2C3E50'   // فضي مزرق داكن
  },
  features: {
    primary: '#C0C0C0',     // فضي
    secondary: '#FFFFFF',   // أبيض
    background: '#34495E'   // فضي مزرق متوسط
  },
  services: {
    primary: '#708090',     // فضي مزرق
    secondary: '#C0C0C0',   // فضي
    background: '#2C3E50'   // فضي مزرق داكن
  },
  products: {
    primary: '#FFFFFF',     // أبيض
    secondary: '#708090',   // فضي مزرق
    background: '#34495E'   // فضي مزرق متوسط
  },
  projects: {
    primary: '#C0C0C0',     // فضي
    secondary: '#708090',   // فضي مزرق
    background: '#2C3E50'   // فضي مزرق داكن
  },
  'website-projects': {
    primary: '#708090',     // فضي مزرق
    secondary: '#FFFFFF',   // أبيض
    background: '#34495E'   // فضي مزرق متوسط
  },
  'web-applications': {
    primary: '#FFFFFF',     // أبيض
    secondary: '#C0C0C0',   // فضي
    background: '#2C3E50'   // فضي مزرق داكن
  },
  auth: {
    primary: '#C0C0C0',     // فضي
    secondary: '#708090',   // فضي مزرق
    background: '#34495E'   // فضي مزرق متوسط
  },
  contact: {
    primary: '#FFFFFF',     // أبيض
    secondary: '#C0C0C0',   // فضي
    background: '#2C3E50'   // فضي مزرق داكن
  }
};

interface DynamicThemeContextType {
  activeSection: string;
  colors: SectionColors;
}

const DynamicThemeContext = createContext<DynamicThemeContextType | undefined>(undefined);

export const useDynamicTheme = () => {
  const context = useContext(DynamicThemeContext);
  if (!context) {
    throw new Error('useDynamicTheme must be used within a DynamicThemeProvider');
  }
  return context;
};

export const DynamicThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const activeSection = useSectionObserver();
  const colors = sectionThemes[activeSection] || sectionThemes.home;

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // تطبيق تأثيرات انتقالية هادئة
    root.style.transition = 'all 0.8s ease-in-out';
    body.style.transition = 'all 0.8s ease-in-out';
    
    // تطبيق الألوان الأساسية
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--section-background', colors.background);
    
    // تطبيق خلفية الجسم الرئيسي
    body.style.background = colors.background;
    body.style.color = colors.primary;
    
    // تطبيق الأنماط الديناميكية البسيطة
    const updateDynamicStyles = () => {
      const existingStyle = document.getElementById('dynamic-section-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      const style = document.createElement('style');
      style.id = 'dynamic-section-styles';
      style.innerHTML = `
        /* الألوان الأساسية */
        .text-yellow-500, .text-primary, .gradient-text { 
          color: ${colors.primary} !important; 
          transition: color 0.8s ease-in-out !important;
        }
        
        .bg-yellow-500, .bg-primary { 
          background-color: ${colors.primary} !important; 
          transition: background-color 0.8s ease-in-out !important;
        }
        
        .border-yellow-500, .border-primary { 
          border-color: ${colors.primary} !important; 
          transition: border-color 0.8s ease-in-out !important;
        }
        
        /* تأثيرات التمرير */
        .hover\\:bg-yellow-500:hover, .hover\\:bg-primary:hover,
        .hover\\:bg-yellow-400:hover { 
          background-color: ${colors.secondary} !important; 
        }
        
        /* خلفيات الأقسام */
        section[id] {
          background-color: ${colors.background} !important;
          transition: background-color 0.8s ease-in-out !important;
        }
        
        /* البطاقات والعناصر */
        .bg-gray-900, .bg-gray-800, .bg-black {
          background-color: ${colors.background} !important;
          transition: background-color 0.8s ease-in-out !important;
        }
        
        .border-gray-700, .border-gray-600 {
          border-color: ${colors.secondary}80 !important;
          transition: border-color 0.8s ease-in-out !important;
        }
        
        /* النصوص */
        .text-white {
          color: ${colors.primary} !important;
          transition: color 0.8s ease-in-out !important;
        }
        
        .text-gray-300, .text-gray-400 {
          color: ${colors.secondary} !important;
          transition: color 0.8s ease-in-out !important;
        }
        
        /* تأثيرات خاصة */
        .hero-gradient {
          background: linear-gradient(135deg, ${colors.background} 0%, ${colors.background}E6 50%, ${colors.background} 100%) !important;
          transition: background 0.8s ease-in-out !important;
        }
      `;
      document.head.appendChild(style);
    };

    updateDynamicStyles();
    
  }, [activeSection, colors]);

  return (
    <DynamicThemeContext.Provider value={{ activeSection, colors }}>
      {children}
    </DynamicThemeContext.Provider>
  );
};
