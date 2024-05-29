import { useState } from 'react';

const usePasswordVisibility = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return {
    isPasswordVisible,
    togglePasswordVisibility,
  };
};
export default usePasswordVisibility;
