
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeVariant = 'black-gold' | 'purple-gold' | 'black-white' | 'emerald-luxury';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  card: string;
  border: string;
}

const themeVariants: Record<ThemeVariant, ThemeColors> = {
  'black-gold': {
    primary: '#FFD700',
    secondary: '#FFA500',
    accent: '#FFD700',
    background: '#000000',
    foreground: '#FFFFFF',
    muted: '#1a1a1a',
    card: '#2a2a2a',
    border: '#333333'
  },
  'purple-gold': {
    primary: '#FFD700',
    secondary: '#9333EA',
    accent: '#FFD700',
    background: '#1a0f2e',
    foreground: '#FFFFFF',
    muted: '#2d1b4e',
    card: '#3d2863',
    border: '#6b46c1'
  },
  'black-white': {
    primary: '#FFFFFF',
    secondary: '#E5E7EB',
    accent: '#F3F4F6',
    background: '#000000',
    foreground: '#FFFFFF',
    muted: '#1f1f1f',
    card: '#2a2a2a',
    border: '#404040'
  },
  'emerald-luxury': {
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    background: '#0c1f17',
    foreground: '#FFFFFF',
    muted: '#1a2e23',
    card: '#2d4a3a',
    border: '#047857'
  }
};

interface ThemeContextType {
  currentTheme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>('black-gold');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeVariant;
    if (savedTheme && themeVariants[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const colors = themeVariants[currentTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--foreground', colors.foreground);
    root.style.setProperty('--muted', colors.muted);
    root.style.setProperty('--card', colors.card);
    root.style.setProperty('--border', colors.border);
    
    document.body.style.background = colors.background;
    document.body.style.color = colors.foreground;
  }, [currentTheme]);

  const setTheme = (theme: ThemeVariant) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        setTheme, 
        colors: themeVariants[currentTheme] 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
