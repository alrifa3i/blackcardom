
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProjectViewerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const ProjectViewer: React.FC<ProjectViewerProps> = ({ isOpen, onClose, url, title }) => {
  if (!url) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-full w-full h-full sm:max-w-[95vw] sm:max-h-[95vh] flex flex-col p-0 rounded-lg">
        <DialogHeader className="p-4 border-b border-gray-800 flex flex-row items-center justify-between flex-shrink-0">
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-gray-700">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectViewer;
