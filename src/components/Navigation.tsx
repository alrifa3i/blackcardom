
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeSelector from '@/components/ThemeSelector';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showArabic, setShowArabic] = useState(true);

  const navItems = [
    { name: 'الرئيسية', href: '/', isRoute: true },
    { name: 'خدماتنا', href: '#services', isRoute: false },
    { name: 'منتجاتنا', href: '#products', isRoute: false },
    { name: 'تصميم مواقع', href: '#website-projects', isRoute: false },
    { name: 'تطبيقات ويب', href: '#web-applications', isRoute: false },
    { name: 'مشاريعنا', href: '#projects', isRoute: false },
    { name: 'من نحن', href: '/about', isRoute: true },
    { name: 'تواصل معنا', href: '#contact', isRoute: false },
  ];

  // تبديل اللغة كل 3 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setShowArabic(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

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

  const handleHomeClick = () => {
    scrollToTop();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/20 ajax-hologram">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" onClick={handleHomeClick} className="block">
              <div className="relative w-64 h-12 sm:h-14 md:h-16 overflow-hidden">
                {/* الاسم العربي */}
                <div 
                  className={`absolute inset-0 flex items-center justify-start transition-all duration-1000 ease-in-out ${
                    showArabic 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform translate-x-full'
                  }`}
                >
                  <span 
                    className="ajax-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-extrabold whitespace-nowrap text-xl md:text-2xl lg:text-3xl animate-slide-in-arabic"
                    style={{
                      backgroundSize: '200% 200%',
                      animation: showArabic ? 'gradient-shift 2s ease infinite, slide-in-arabic 1s ease-out' : 'none',
                      textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                      filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))',
                    }}
                  >
                    شركة الكارت الاسود
                  </span>
                </div>
                
                {/* الاسم الإنجليزي */}
                <div 
                  className={`absolute inset-0 flex items-center justify-start transition-all duration-1000 ease-in-out ${
                    !showArabic 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform -translate-x-full'
                  }`}
                >
                  <span 
                    className="ajax-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-extrabold whitespace-nowrap text-xl md:text-2xl lg:text-3xl animate-slide-in-english"
                    style={{
                      backgroundSize: '200% 200%',
                      animation: !showArabic ? 'gradient-shift 2s ease infinite, slide-in-english 1s ease-out' : 'none',
                      textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                      filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))',
                    }}
                  >
                    The Black Card
                  </span>
                </div>
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
                  onClick={item.href === '/' ? handleHomeClick : undefined}
                  className="ajax-nav-item text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-sm px-3 py-2 rounded-md hover:bg-yellow-500/10"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="ajax-nav-item text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-sm px-3 py-2 rounded-md hover:bg-yellow-500/10"
                >
                  {item.name}
                </button>
              )
            ))}
          </div>

          {/* Action Buttons - Right Side */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>
            <Button 
              onClick={scrollToAuth}
              variant="outline" 
              className="ajax-button hidden md:block border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-xs lg:text-sm transition-all duration-300 px-2 lg:px-4"
            >
              انضم الآن
            </Button>
            <Link to="/admin" className="hidden md:block">
              <Button className="ajax-button bg-yellow-500 text-black hover:bg-yellow-400 text-xs lg:text-sm transition-all duration-300 px-2 lg:px-4">
                لوحة التحكم
              </Button>
            </Link>
          </div>

          {/* Mobile menu section */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
            <span className="text-yellow-500 font-medium text-xs ajax-text">القائمة</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="ajax-button text-white p-1.5 sm:p-2 hover:bg-yellow-500/10"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-yellow-500/20 bg-black/98 backdrop-blur-md ajax-card">
            <div className="text-center mb-4">
              <span className="text-yellow-500 font-bold text-lg ajax-text">القائمة</span>
            </div>
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="ajax-nav-item text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-center py-3 px-4 rounded-lg hover:bg-yellow-500/10"
                    onClick={item.href === '/' ? handleHomeClick : () => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="ajax-nav-item text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-center py-3 px-4 rounded-lg hover:bg-yellow-500/10"
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
                  className="ajax-button border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black w-full transition-all duration-300"
                >
                  انضم الآن
                </Button>
                <Link to="/admin">
                  <Button className="ajax-button bg-yellow-500 text-black hover:bg-yellow-400 w-full transition-all duration-300">
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
