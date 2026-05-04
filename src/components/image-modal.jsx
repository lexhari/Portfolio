import { X } from "lucide-react";

export default function ImageModal({ imageSrc, imageAlt, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="relative max-w-6xl max-h-screen"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={imageSrc} 
                    alt={imageAlt} 
                    className="w-full h-auto rounded-2xl max-h-screen object-contain"
                />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold text-navy hover:bg-gray-200 transition-colors"
                >
                    <X />
                </button>
            </div>
        </div>
    );
}
