import { useEffect, useState } from 'react';

const useScreenHeight = () => {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    // Function to update the screen height
    const updateHeight = () => setScreenHeight(window.innerHeight);

    // Initial setting of the screen height
    updateHeight();

    // Add event listener to update height on window resize
    window.addEventListener('resize', updateHeight);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return screenHeight;
};

export default useScreenHeight;
