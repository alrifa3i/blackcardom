
import React, { createContext, useContext, useEffect } from 'react';
import { useSectionObserver } from '@/hooks/useSectionObserver';

interface SectionColors {
  primary: string;
  secondary: string;
  background: string;
}

const sectionThemes: Record<string, SectionColors> = {
  home: {
    primary: '#FFD700',    // ذهبي
    secondary: '#FFA500',  // برتقالي ذهبي
    background: '#000000'  // أسود
  },
  features: {
    primary: '#FFFFFF',    // أبيض
    secondary: '#E5E7EB',  // رمادي فاتح
    background: '#1F2937'  // رمادي داكن
  },
  services: {
    primary: '#10B981',    // أخضر
    secondary: '#34D399',  // أخضر فاتح
    background: '#064E3B'  // أخضر داكن
  },
  products: {
    primary: '#8B5CF6',    // بنفسجي
    secondary: '#A78BFA',  // بنفسجي فاتح
    background: '#581C87'  // بنفسجي داكن
  },
  projects: {
    primary: '#F59E0B',    // برتقالي
    secondary: '#FCD34D',  // أصفر برتقالي
    background: '#92400E'  // برتقالي داكن
  },
  'website-projects': {
    primary: '#3B82F6',    // أزرق
    secondary: '#93C5FD',  // أزرق فاتح
    background: '#1E3A8A'  // أزرق داكن
  },
  'web-applications': {
    primary: '#EF4444',    // أحمر
    secondary: '#FCA5A5',  // أحمر فاتح
    background: '#991B1B'  // أحمر داكن
  },
  auth: {
    primary: '#06B6D4',    // سماوي
    secondary: '#67E8F9',  // سماوي فاتح
    background: '#0E7490'  // سماوي داكن
  },
  contact: {
    primary: '#FFD700',    // ذهبي (نفس الرئيسية)
    secondary: '#FFA500',  // برتقالي ذهبي
    background: '#000000'  // أسود
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
    
    // تطبيق تأثيرات انتقالية سلسة
    root.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    body.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // تطبيق الألوان الأساسية
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--section-background', colors.background);
    
    // تطبيق خلفية الجسم الرئيسي
    body.style.background = colors.background;
    body.style.color = colors.primary;
    
    // تطبيق الأنماط الديناميكية للعناصر
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
          transition: color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .bg-yellow-500, .bg-primary { 
          background-color: ${colors.primary} !important; 
          transition: background-color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .border-yellow-500, .border-primary { 
          border-color: ${colors.primary} !important; 
          transition: border-color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* تأثيرات التمرير */
        .hover\\:bg-yellow-500:hover, .hover\\:bg-primary:hover,
        .hover\\:bg-yellow-400:hover { 
          background-color: ${colors.secondary} !important; 
        }
        
        /* خلفيات الأقسام */
        section[id] {
          background-color: ${colors.background} !important;
          transition: background-color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* البطاقات والعناصر */
        .bg-gray-900, .bg-gray-800, .bg-black {
          background-color: ${colors.background} !important;
          transition: background-color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .border-gray-700, .border-gray-600 {
          border-color: ${colors.secondary}40 !important;
          transition: border-color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* النصوص */
        .text-white {
          color: ${colors.primary} !important;
          transition: color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .text-gray-300, .text-gray-400 {
          color: ${colors.secondary} !important;
          transition: color 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* تأثيرات خاصة */
        .hero-gradient {
          background: linear-gradient(135deg, ${colors.background} 0%, ${colors.background}CC 50%, ${colors.background} 100%) !important;
          transition: background 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* تحديد القسم النشط */
        section[id].active-section {
          box-shadow: inset 0 0 0 2px ${colors.primary}40;
        }
      `;
      document.head.appendChild(style);
    };

    updateDynamicStyles();
    
    // إضافة كلاس للقسم النشط
    document.querySelectorAll('section[id]').forEach(section => {
      section.classList.remove('active-section');
    });
    
    const activeElement = document.getElementById(activeSection);
    if (activeElement) {
      activeElement.classList.add('active-section');
    }
    
  }, [activeSection, colors]);

  return (
    <DynamicThemeContext.Provider value={{ activeSection, colors }}>
      {children}
    </DynamicThemeContext.Provider>
  );
};
