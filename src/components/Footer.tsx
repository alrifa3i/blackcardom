
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'من نحن', href: '#about' },
      { name: 'رؤيتنا ورسالتنا', href: '#vision' },
      { name: 'فريق العمل', href: '#team' },
      { name: 'الشراكات', href: '#partnerships' }
    ],
    services: [
      { name: 'تطوير التطبيقات', href: '#services' },
      { name: 'إدارة المشاريع', href: '#services' },
      { name: 'الحلول السحابية', href: '#services' },
      { name: 'الأمن السيبراني', href: '#services' }
    ],
    products: [
      { name: 'نظام إدارة المشاريع', href: '#products' },
      { name: 'منصة التجارة الإلكترونية', href: '#products' },
      { name: 'تطبيق CRM', href: '#products' },
      { name: 'نظام إدارة المحتوى', href: '#products' }
    ],
    support: [
      { name: 'الدعم الفني', href: '#support' },
      { name: 'الأسئلة الشائعة', href: '#faq' },
      { name: 'التوثيق', href: '#docs' },
      { name: 'التحديثات', href: '#updates' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', name: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', name: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', name: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold gradient-text mb-4">The Black Card</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                شركة متخصصة في تقديم حلول إدارة المشاريع وتطوير التطبيقات والأنظمة الذكية. 
                نحول أفكارك إلى واقع رقمي مبتكر.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400">info@theblack-card.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-yellow-500 mt-1" />
                <div className="text-gray-400">
                  <div>Al Khuwair / Bousher / Muscat Governorate</div>
                  <div className="text-sm">الخوير / بوشر / محافظة مسقط</div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">الشركة</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">الخدمات</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">الدعم</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            <div className="mb-2">
              © {currentYear} الكرت الأسود ش م م - THE BLACK CARD LLC
            </div>
            <div className="text-sm">
              شركة محدودة المسؤولية | رقم السجل: 1551835
            </div>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
              شروط الاستخدام
            </a>
            <a href="#cookies" className="text-gray-400 hover:text-yellow-500 transition-colors">
              سياسة الكوكيز
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
