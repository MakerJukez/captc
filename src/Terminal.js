import React from 'react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';

const LoadingDots = () => {
  const dotVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = {
    hidden: { transition: { staggerChildren: 0.2 } },
    visible: { transition: { staggerChildren: 0.2, staggerDirection: 1 } },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{ display: 'inline-flex' }}
    >
      {[0, 1, 2].map((_, i) => (
        <motion.span
          key={i}
          variants={dotVariants}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
          }}
        >
          .
        </motion.span>
      ))}
    </motion.span>
  );
};

const Terminal = ({ onClose }) => {
  const securityItems = [
    "Securing Phantom",
    "Securing Raydium",
    "Securing Pump.fun",
    "Securing Magic Eden",
    "Securing Degen Coin Flip",
  ];

  return (
    <Draggable>
      <div className="w-96 h-60 bg-black text-lime-300 border-2 border-[#5a5a5a] border-r-white border-b-white font-custom overflow-hidden absolute top-20 left-20 z-50">
        <div className="bg-[#000080] text-white font-bold p-2 flex justify-between items-center">
          <span className='text-lg'>Console</span>
          <div className="flex space-x-1">
            <button className="w-4 h-4 bg-[#c0c0c0] border border-[#5a5a5a] flex items-center justify-center text-black text-xs">_</button>
            <button className="w-4 h-4 bg-[#c0c0c0] border border-[#5a5a5a] flex items-center justify-center text-black text-xs">□</button>
            <button onClick={onClose} className="w-4 h-4 bg-[#c0c0c0] border border-[#5a5a5a] flex items-center justify-center text-black text-xs">
              X
            </button>
          </div>
        </div>
        <div className="p-4 font-mono text-white text-xs">
          {securityItems.map((item, index) => (
            <p>
              {item}<LoadingDots />
            </p>
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default Terminal;