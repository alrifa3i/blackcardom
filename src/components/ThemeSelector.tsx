
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme, ThemeVariant } from '@/contexts/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();

  const themes = [
    {
      id: 'black-gold' as ThemeVariant,
      name: 'أسود وذهبي',
      colors: ['#000000', '#FFD700', '#FFFFFF'],
      description: 'التصميم الكلاسيكي الفخم'
    },
    {
      id: 'purple-gold' as ThemeVariant,
      name: 'بنفسجي وذهبي',
      colors: ['#1a0f2e', '#9333EA', '#FFD700'],
      description: 'التصميم الملكي الأنيق'
    },
    {
      id: 'black-white' as ThemeVariant,
      name: 'أسود وأبيض',
      colors: ['#000000', '#FFFFFF', '#E5E7EB'],
      description: 'التصميم الأنيق البسيط'
    },
    {
      id: 'emerald-luxury' as ThemeVariant,
      name: 'زمردي فخم',
      colors: ['#0c1f17', '#10B981', '#34D399'],
      description: 'التصميم الطبيعي الفاخر'
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-gray-900 border-gray-700 text-white"
      >
        <div className="p-2 border-b border-gray-700">
          <h3 className="font-semibold text-sm">اختر لون الموقع</h3>
        </div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className="p-3 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {theme.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-medium text-sm">{theme.name}</div>
                  <div className="text-xs text-gray-400">{theme.description}</div>
                </div>
              </div>
              {currentTheme === theme.id && (
                <Check className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
