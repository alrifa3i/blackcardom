
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { adminMenuSections } from '@/data/adminMenuSections';

interface AdminDashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminDashboardSidebar: React.FC<AdminDashboardSidebarProps> = ({
  activeSection,
  onSectionChange
}) => {
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 min-h-screen">
      <div className="p-4">
        <div className="space-y-6">
          {adminMenuSections.map((section) => (
            <div key={section.id}>
              <h3 className="text-gray-400 text-sm font-semibold mb-3 px-2">{section.title}</h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-right transition-colors ${
                    activeSection === section.id
                      ? 'bg-yellow-500 text-black'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <section.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 text-right">
                    <div className="font-medium">{section.title}</div>
                    <div className={`text-xs ${activeSection === section.id ? 'text-black/70' : 'text-gray-500'}`}>
                      {section.description}
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${
                    activeSection === section.id ? 'rotate-90' : ''
                  }`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSidebar;
