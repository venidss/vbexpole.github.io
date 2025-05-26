import { useState } from 'react';

interface WindowsFormsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WindowsFormsModal({ isOpen, onClose }: WindowsFormsModalProps) {
  const [selectedVideo, setSelectedVideo] = useState(0);
  
  const tutorials = [
    {
      title: "Introduction to Windows Forms",
      url: "https://www.youtube.com/embed/OB7YMB3jqHI",
      description: "Learn the basics of Windows Forms in VB.NET"
    },
    {
      title: "Creating Your First Form",
      url: "https://www.youtube.com/embed/CkpUQYzYCC8",
      description: "Step-by-step guide to creating forms"
    },
    {
      title: "Working with Controls",
      url: "https://www.youtube.com/embed/jzwMvvjvwQw",
      description: "Learn about buttons, textboxes, and other controls"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-600">Windows Forms Tutorials</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Video List Sidebar */}
            <div className="space-y-4">
              {tutorials.map((tutorial, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVideo(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedVideo === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <h3 className="font-semibold">{tutorial.title}</h3>
                  <p className={`text-sm mt-1 ${
                    selectedVideo === index ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {tutorial.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Video Player Area */}
            <div className="col-span-2">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={tutorials[selectedVideo].url}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {tutorials[selectedVideo].title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {tutorials[selectedVideo].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
