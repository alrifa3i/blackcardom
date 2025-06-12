
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeSelector from '@/components/ThemeSelector';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'الرئيسية', href: '/', isRoute: true },
    { name: 'خدماتنا', href: '#services', isRoute: false },
    { name: 'منتجاتنا', href: '#products', isRoute: false },
    { name: 'مشاريعنا', href: '#projects', isRoute: false },
    { name: 'من نحن', href: '/about', isRoute: true },
    { name: 'تواصل معنا', href: '#contact', isRoute: false },
  ];

  const scrollToAuth = () => {
    const authSection = document.getElementById('auth');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleNavClick = (item: any) => {
    if (!item.isRoute && item.href.startsWith('#')) {
      const element = document.getElementById(item.href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Right Side */}
          <div className="flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors">
              <div className="flex flex-col leading-tight">
                <span className="text-yellow-500">شركة الكارت الأسود</span>
                <span className="text-yellow-400 text-sm">The Black Card</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-sm px-3 py-2 rounded-md hover:bg-yellow-500/10"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-sm px-3 py-2 rounded-md hover:bg-yellow-500/10"
                >
                  {item.name}
                </button>
              )
            ))}
          </div>

          {/* Action Buttons - Left Side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>
            <Button 
              onClick={scrollToAuth}
              variant="outline" 
              className="hidden sm:block border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-sm transition-all duration-300"
            >
              انضم الآن
            </Button>
            <Link to="/admin" className="hidden sm:block">
              <Button className="bg-yellow-500 text-black hover:bg-yellow-400 text-sm transition-all duration-300">
                لوحة التحكم
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-yellow-500/10"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-yellow-500/20 bg-black/98 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-center py-3 px-4 rounded-lg hover:bg-yellow-500/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-center py-3 px-4 rounded-lg hover:bg-yellow-500/10"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="flex flex-col gap-3 mt-4 px-4">
                <div className="flex justify-center">
                  <ThemeSelector />
                </div>
                <Button 
                  onClick={scrollToAuth}
                  variant="outline" 
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black w-full transition-all duration-300"
                >
                  انضم الآن
                </Button>
                <Link to="/admin">
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-400 w-full transition-all duration-300">
                    لوحة التحكم
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
