
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Dashboard, Theme Selector and Join Buttons - Left Side */}
          <div className="flex items-center gap-3">
            <Link to="/admin" className="hidden sm:block">
              <Button className="bg-yellow-500 text-black hover:bg-yellow-400 text-sm">
                لوحة التحكم
              </Button>
            </Link>
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>
            <Button 
              onClick={scrollToAuth}
              variant="outline" 
              className="hidden sm:block border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-sm"
            >
              انضم الآن
            </Button>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium text-sm"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium text-sm"
                >
                  {item.name}
                </button>
              )
            ))}
          </div>

          {/* Logo - Right Side */}
          <div className="flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold gradient-text">
              The Black Card
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 bg-black/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium text-center py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium text-center py-2"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/admin">
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-400 w-full">
                    لوحة التحكم
                  </Button>
                </Link>
                <div className="flex justify-center">
                  <ThemeSelector />
                </div>
                <Button 
                  onClick={scrollToAuth}
                  variant="outline" 
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black w-full"
                >
                  انضم الآن
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
