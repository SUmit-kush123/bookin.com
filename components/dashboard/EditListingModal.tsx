import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ListingItem } from '../../types';
import { IconX, IconPhoto, IconTrash, IconPlus } from '../../constants';

interface EditListingModalProps {
  listing: ListingItem;
  onClose: () => void;
  onSave: (updatedListing: ListingItem) => void;
}

const EditListingModal: React.FC<EditListingModalProps> = ({ listing, onClose, onSave }) => {
  const [formData, setFormData] = useState(listing);
  const [images, setImages] = useState(listing.images);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleRemoveImage = (index: number) => {
      setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleAddImage = () => {
      // Mock adding a new image
      const newImage = `https://picsum.photos/seed/new-${Date.now()}/800/600`;
      setImages(prev => [...prev, newImage]);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, images });
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-neutral-d-light w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <header className="flex justify-between items-center p-4 border-b border-neutral-extralight dark:border-neutral-d-extralight flex-shrink-0">
          <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-d-dark">Edit Listing: {listing.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors">
            <IconX className="w-6 h-6 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* Basic Info */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Listing Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md bg-white dark:bg-neutral-d-light/50"/>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md bg-white dark:bg-neutral-d-light/50"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                     <label htmlFor="pricePerNight" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Price (per night/person)</label>
                     <input type="number" id="pricePerNight" name="pricePerNight" value={formData.pricePerNight || ''} onChange={handlePriceChange} className="w-full p-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md bg-white dark:bg-neutral-d-light/50"/>
                </div>
                <div>
                     <label htmlFor="rating" className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Rating</label>
                     <input type="number" id="rating" name="rating" value={formData.rating} onChange={handlePriceChange} step="0.1" min="0" max="5" className="w-full p-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md bg-white dark:bg-neutral-d-light/50"/>
                </div>
            </div>

            {/* Media Management */}
            <div>
                <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-d-dark mb-2">Manage Media</h3>
                <div>
                    <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Video URL (optional)</label>
                    <input type="text" name="videoUrl" value={formData.videoUrl || ''} onChange={handleChange} placeholder="e.g., https://example.com/video.mp4" className="w-full p-2 border border-neutral-extralight dark:border-neutral-d-extralight rounded-md bg-white dark:bg-neutral-d-light/50"/>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-neutral-dark dark:text-neutral-d-dark mb-1">Images</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {images.map((img, index) => (
                            <div key={index} className="relative aspect-square group">
                                <img src={img} alt={`Listing image ${index + 1}`} className="w-full h-full object-cover rounded-md"/>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-600/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Remove image"
                                >
                                    <IconTrash className="w-3 h-3"/>
                                </button>
                            </div>
                        ))}
                         <button
                            type="button"
                            onClick={handleAddImage}
                            className="aspect-square flex items-center justify-center border-2 border-dashed border-neutral-extralight dark:border-neutral-d-extralight rounded-md text-neutral-DEFAULT dark:text-neutral-d-DEFAULT hover:border-primary dark:hover:border-accent hover:text-primary dark:hover:text-accent"
                        >
                            <IconPlus className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>
        </form>

        <footer className="flex justify-end items-center p-4 border-t border-neutral-extralight dark:border-neutral-d-extralight flex-shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-neutral-dark dark:text-neutral-d-dark bg-secondary dark:bg-neutral-d-extralight rounded-md mr-3 hover:bg-secondary-dark dark:hover:bg-neutral-d-extralight/70">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-primary dark:bg-accent hover:bg-primary-dark dark:hover:bg-accent-dark rounded-md">Save Changes</button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default EditListingModal;