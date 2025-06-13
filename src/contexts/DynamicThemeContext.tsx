
import React, { createContext, useContext, useEffect } from 'react';
import { useSectionObserver } from '@/hooks/useSectionObserver';

interface SectionColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  card: string;
  border: string;
  gradient: string;
}

const sectionThemes: Record<string, SectionColors> = {
  home: {
    primary: '#FFD700',
    secondary: '#FFA500',
    accent: '#FFD700',
    background: '#000000',
    foreground: '#FFFFFF',
    muted: '#1a1a1a',
    card: '#2a2a2a',
    border: '#333333',
    gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
  },
  features: {
    primary: '#E5E7EB',
    secondary: '#9CA3AF',
    accent: '#F3F4F6',
    background: '#111827',
    foreground: '#F9FAFB',
    muted: '#1F2937',
    card: '#374151',
    border: '#4B5563',
    gradient: 'linear-gradient(135deg, #111827 0%, #1F2937 50%, #111827 100%)'
  },
  services: {
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    background: '#064E3B',
    foreground: '#ECFDF5',
    muted: '#065F46',
    card: '#047857',
    border: '#059669',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #064E3B 100%)'
  },
  products: {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    accent: '#A78BFA',
    background: '#581C87',
    foreground: '#FAF5FF',
    muted: '#6B21A8',
    card: '#7C2D92',
    border: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #581C87 0%, #6B21A8 50%, #581C87 100%)'
  },
  projects: {
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FCD34D',
    background: '#92400E',
    foreground: '#FFFBEB',
    muted: '#B45309',
    card: '#D97706',
    border: '#F59E0B',
    gradient: 'linear-gradient(135deg, #92400E 0%, #B45309 50%, #92400E 100%)'
  },
  'website-projects': {
    primary: '#3B82F6',
    secondary: '#2563EB',
    accent: '#93C5FD',
    background: '#1E3A8A',
    foreground: '#EFF6FF',
    muted: '#1E40AF',
    card: '#2563EB',
    border: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #1E3A8A 100%)'
  },
  'web-applications': {
    primary: '#EF4444',
    secondary: '#DC2626',
    accent: '#FCA5A5',
    background: '#991B1B',
    foreground: '#FEF2F2',
    muted: '#B91C1C',
    card: '#DC2626',
    border: '#EF4444',
    gradient: 'linear-gradient(135deg, #991B1B 0%, #B91C1C 50%, #991B1B 100%)'
  },
  auth: {
    primary: '#06B6D4',
    secondary: '#0891B2',
    accent: '#67E8F9',
    background: '#0E7490',
    foreground: '#F0F9FF',
    muted: '#0369A1',
    card: '#0284C7',
    border: '#06B6D4',
    gradient: 'linear-gradient(135deg, #0E7490 0%, #0369A1 50%, #0E7490 100%)'
  },
  contact: {
    primary: '#FFD700',
    secondary: '#FFA500',
    accent: '#FFD700',
    background: '#000000',
    foreground: '#FFFFFF',
    muted: '#1a1a1a',
    card: '#2a2a2a',
    border: '#333333',
    gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
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
    
    // تطبيق الألوان مع تأثيرات انتقالية
    root.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // تطبيق الألوان الجديدة
    Object.entries(colors).forEach(([property, value]) => {
      if (property !== 'gradient') {
        root.style.setProperty(`--${property}`, value);
      }
    });
    
    // تطبيق الخلفية والنص
    body.style.background = colors.gradient;
    body.style.color = colors.foreground;
    
    // تطبيق الألوان على العناصر المخصصة
    const updateDynamicStyles = () => {
      const existingStyle = document.getElementById('dynamic-section-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      const style = document.createElement('style');
      style.id = 'dynamic-section-styles';
      style.innerHTML = `
        .bg-yellow-500, .bg-primary { 
          background-color: ${colors.primary} !important; 
          transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .text-yellow-500, .text-primary { 
          color: ${colors.primary} !important; 
          transition: color 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .border-yellow-500, .border-primary { 
          border-color: ${colors.primary} !important; 
          transition: border-color 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .hover\\:bg-yellow-500:hover, .hover\\:bg-primary:hover { 
          background-color: ${colors.secondary} !important; 
        }
        .hover\\:bg-yellow-400:hover { 
          background-color: ${colors.secondary} !important; 
        }
        .bg-blue-600, .bg-secondary { 
          background-color: ${colors.secondary} !important; 
          transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .hover\\:bg-blue-500:hover, .hover\\:bg-secondary:hover { 
          background-color: ${colors.accent} !important; 
        }
        .gradient-text {
          background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}) !important;
          background-size: 200% 200% !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .modern-card, .service-card, .project-card {
          background: linear-gradient(145deg, ${colors.muted}, ${colors.card}) !important;
          border-color: ${colors.border} !important;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .modern-card:hover, .service-card:hover, .project-card:hover {
          border-color: ${colors.primary} !important;
          box-shadow: 0 15px 35px ${colors.primary}15 !important;
        }
        .glass-effect {
          background: ${colors.background}CC !important;
          border-color: ${colors.border}40 !important;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .hero-gradient {
          background: ${colors.gradient} !important;
          transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
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
