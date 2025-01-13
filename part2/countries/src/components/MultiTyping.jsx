// MultiTyping.js
import React, { useEffect, useRef, useState } from 'react';
import TypeIt from 'typeit';

const MultiTyping = ({ stringsArray, typingIndex, setTypingIndex, speed = 50, waitUntilVisible = true }) => {
  const typeItRef = useRef(null);

  const [typed , setTyped] = useState(false);
  const currentString = stringsArray[typingIndex]; // Get the current string based on typingIndex

  useEffect(() => {
    if(!typed){
        const typeItInstance = new TypeIt(typeItRef.current, {
          strings: currentString,
          speed: speed,
          waitUntilVisible: waitUntilVisible,
          cursor: true,
          afterComplete: () => {
            // Once typing is complete, increase typingIndex
            if (typingIndex < stringsArray.length - 1) {
              setTypingIndex(typingIndex + 1); // Move to the next string
            }
            setTyped(true)
          },
        }).go();
    
        return () => {
          typeItInstance.destroy(); // Clean up when component unmounts
        };
    }
  }, [currentString, typingIndex, speed, waitUntilVisible, setTypingIndex, stringsArray.length]);

  return <div ref={typeItRef}></div>;
};

export default MultiTyping;
