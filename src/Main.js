import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from './Crystal.jpg';
import Terminal from './Terminal'; // Import Terminal component
import Draggable from 'react-draggable';

function Main() {
  const [showBanner, setShowBanner] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true); // Track captcha visibility
  const [isPlaying, setIsPlaying] = useState(false); // Track music playback
  const audioRef = useRef(null); // Reference to the audio element
  const terminalRef = useRef(null);

  // Trigger content display after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle clicks outside the terminal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target)) {
        setShowTerminal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTerminal]);

  // Toggle music playback
  const handleToggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpenTerminal = () => {
    setShowTerminal(true);
  };

  const handleCloseTerminal = () => {
    setShowTerminal(false);
  };

  const handleCloseBanner = () => {
    setShowBanner(false); // Close the banner
  };

  const handleCloseCaptcha = () => {
    setShowCaptcha(false); // Hide the captcha image
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#c0c0c0] font-['MS_Sans_Serif', sans-serif] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      {showBanner && (
        <div className="bg-[#000080] font-custom border-white border-b-2 border-b-[#5a5a5a] p-1 flex justify-between items-center text-white">
          <span className="text-[7px] md:text-xs pl-2">Captcha Dog v.1 Updates in progress...</span>
          <button
            onClick={handleCloseBanner}
            className="px-1 py-0.25 bg-[#c0c0c0] text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-[#5a5a5a] border-r-[#5a5a5a] active:border-t-[#5a5a5a] active:border-l-[#5a5a5a] active:border-b-white active:border-r-white"
          >
            X
          </button>
        </div>
      )}

      <div className="flex-grow flex justify-center items-center relative overflow-hidden">
        {showCaptcha && (
          <Draggable>
            <div className="w-96 bg-[#c0c0c0] border-2 border-white border-r-[#5a5a5a] border-b-[#5a5a5a] shadow-md z-20 max-w-[330px] md:max-w-[395px]">
                <div className="bg-[#000080] text-white font-bold p-1 flex justify-between items-center font-custom">
                <span className='text-2xl pl-1'>Captcha Dog</span>
                <div className="flex space-x-1">
                    <button className="w-4 h-4 bg-[#c0c0c0] border border-[#5a5a5a] flex items-center justify-center text-black text-xs">_</button>
                    <button className="w-4 h-4 bg-[#c0c0c0] border border-[#5a5a5a] flex items-center justify-center text-black text-xs">□</button>
                    <button className="w-4 h-4 bg-[#c0c0c0] border border-[#5a5a5a] flex items-center justify-center text-black text-xs" onClick={handleCloseCaptcha}>X</button>
                </div>
                </div>
                <div className="p-4 font-custom">
                <div className="flex items-center mb-4">
                    <img src="dog.png" alt="Captcha Dog" className="w-16 h-16 mr-4 border-2 border-[#5a5a5a] border-r-white border-b-white" />
                    <div>
                    <h2 className="text-xl font-bold">cDOG</h2>
                    <p className="text-xs">Goodest boy in cybersecurity</p>
                    </div>
                </div>
                <div className="border-2 border-[#5a5a5a] border-r-white border-b-white p-2 bg-white">
                    <p className="text-sm">
                    Captcha Dog is your friendly neighborhood cybersecurity canine.
                    With a nose for sniffing out bots and a bark that keeps hackers at away,
                    Captcha Dog ensures that only real humans get past the digital gate.
                    </p>
                </div>
                <div className="flex justify-end mt-4">
                    <a href="https://x.com/cdogonsolana">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-8 md:size-10 md:hover:scale-105 transition ease-in-out duration-150' fill="#00000" viewBox="0 0 50 50">
                        <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                    </svg>
                    </a>
                    <a href='https://t.me/Cdogsolana'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-8 md:size-10 md:hover:scale-105 transition ease-in-out duration-150' fill="#29A0DA" viewBox="0 0 50 50">
                        <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
                    </svg>
                    </a>
                </div>
                </div>
            </div>
          </Draggable>
        )}

        <motion.img
          src="dog2.png"
          className="absolute bottom-0 right-0 w-[57%] md:w-[35%]"
          alt="Dog 2"
          initial={{ x: '100%', y: '100%' }}
          animate={showContent ? { x: 0, y: 0 } : { x: '100%', y: '100%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
        <motion.img
          src="dog1.png"
          className="absolute top-0 left-0 w-[57%] md:w-[35%]"
          alt="Dog 1"
          initial={{ x: '-100%', y: '-100%' }}
          animate={showContent ? { x: 0, y: 0 } : { x: '-100%', y: '-100%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />

        <div className='absolute top-5 right-5 flex space-x-2 items-center'>
          <div className='grid justify-items-center' onClick={handleOpenTerminal}>
            <img src="con.png" className='size-10 md:size-12' />
            <div className='text-center text-[7px] text-white font-custom'>Terminal</div>
          </div>
          <div className='grid justify-items-center' onClick={handleToggleMusic}>
            <img src="music.png" className='size-10 md:size-12' />
            <div className='text-center text-[7px] text-white font-custom'>Music</div>
          </div>
        </div>

        {showTerminal && (
          <Terminal onClose={handleCloseTerminal} />
        )}

        {/* Live Indicator */}
        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="relative mr-2">
            <motion.div
              className="w-4 h-4 bg-green-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-4 h-4 bg-green-500 rounded-full absolute top-0 left-0"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <span className="text-xs font-bold text-green-500 font-custom">LIVE</span>
        </div>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="https://ia800605.us.archive.org/8/items/NeverGonnaGiveYouUp/jocofullinterview41.mp3" />
    </div>
  );
}

export default Main;