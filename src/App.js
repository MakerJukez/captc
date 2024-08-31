import React, { useState, useEffect } from 'react';
import Main from './Main';
import './App.css';

const CaptchaModal = ({ onSuccess }) => {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);

  useEffect(() => {
    if (step < 3) {
      generateImages();
    }
  }, [step]);

  const generateImages = () => {
    // Image file names
    const imageFiles = Array.from({ length: 8 }, (_, i) => `/download-${i + 1}.jpg`);
    
    // Shuffle images and choose the correct index
    const shuffledImages = shuffleArray([...imageFiles]);
    const newCorrectIndex = Math.floor(Math.random() * 9);
    
    // Ensure the correct image is included at the correct index
    if (newCorrectIndex >= 8) {
      shuffledImages.push('/dog.png');
    } else {
      shuffledImages.splice(newCorrectIndex, 0, '/dog.png');
    }

    setImages(shuffledImages);
    setCorrectIndex(newCorrectIndex);
  };

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const handleImageClick = (index) => {
    if (index === correctIndex) {
      if (step === 2) {
        onSuccess();
      } else {
        setStep(step + 1);
      }
    } else {
      generateImages();
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="bg-white border w-full max-w-[360px] md:max-w-[395px] overflow-hidden">
        <div className="bg-blue-600 p-4 text-white">
          <h2 className="text-xl font-bold">Select the correct image</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                className="w-full pt-[100%] relative border border-gray-300"
                onClick={() => handleImageClick(index)}
              >
                <div
                  className={`absolute inset-0 bg-cover bg-center ${
                    index === correctIndex ? 'bg-cover' : 'bg-gray-200'
                  }`}
                  style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover', // Ensure images cover their containers
                    backgroundPosition: 'center', // Center the image
                  }}
                ></div>
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button className="text-blue-600 hover:underline">
              New challenge
            </button>
            <div className="text-sm text-gray-600">
              {step + 1} / 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showCaptcha, setShowCaptcha] = useState(true);

  const handleCaptchaSuccess = () => {
    setShowCaptcha(false);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {showCaptcha ? (
        <CaptchaModal onSuccess={handleCaptchaSuccess} />
      ) : (
        <Main/>
      )}
    </div>
  );
}

export default App;