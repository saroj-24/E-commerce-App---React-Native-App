import { useState } from 'react';
const useProgressBar = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return {
    loading,
    startLoading,
    stopLoading,
  };
};

export default useProgressBar;
