import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IconChevronLeft, IconChevronRight, IconX, IconPlayCircle, IconPhoto } from '../../constants';

interface GalleryModalProps {
  images: string[];
  videoUrl?: string;
  initialIndex?: number;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ images, videoUrl, initialIndex = 0, onClose }) => {
  const mediaItems = videoUrl ? [videoUrl, ...images] : images;
  const [currentIndex, setCurrentIndex] = useState(videoUrl ? initialIndex + 1 : initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  const isVideo = (item: string) => item.endsWith('.mp4');
  const currentItem = mediaItems[currentIndex];

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Main Content Area */}
        <div className="flex-grow flex items-center justify-center relative my-4">
          {isVideo(currentItem) ? (
            <video src={currentItem} controls autoPlay className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
          ) : (
            <img src={currentItem} alt={`View ${currentIndex + 1}`} className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
          )}
        </div>
        
        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-4">
           <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">{currentIndex + 1} / {mediaItems.length}</span>
           <button onClick={onClose} className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
            <IconX className="w-7 h-7" />
           </button>
        </div>

        {/* Side Navigation */}
        {mediaItems.length > 1 && (
            <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
                <IconChevronLeft className="w-7 h-7" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
                <IconChevronRight className="w-7 h-7" />
            </button>
            </>
        )}
        
        {/* Thumbnail Strip */}
        <div className="flex-shrink-0 w-full max-w-4xl mx-auto p-4">
          <div className="flex justify-center gap-2 overflow-x-auto custom-scrollbar pb-2">
            {mediaItems.map((item, index) => (
              <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-200
                  ${currentIndex === index ? 'ring-4 ring-accent' : 'opacity-60 hover:opacity-100'}`}
              >
                {isVideo(item) ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <IconPlayCircle className="w-8 h-8 text-white" />
                  </div>
                ) : (
                  <img src={item} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GalleryModal;