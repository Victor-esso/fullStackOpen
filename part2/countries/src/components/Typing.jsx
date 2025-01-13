// Typing.js
import React, { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

const Typing = ({ strings, speed = 50, waitUntilVisible = true }) => {
  const typeItRef = useRef(null);

  useEffect(() => {
    const typeItInstance = new TypeIt(typeItRef.current, {
      strings: strings,
      speed: speed,
      waitUntilVisible: waitUntilVisible,
      cursor: true, // Ensure cursor is visible initially
      afterComplete: () => {
        // Remove the cursor after typing is complete
        typeItRef.current.querySelector('.ti-cursor').style.display = 'none';
      },
    }).go();

    return () => {
      typeItInstance.destroy(); // Clean up when component unmounts
    };
  }, [strings, speed, waitUntilVisible]);

  return <div ref={typeItRef}></div>;
};

export default Typing;
