import { useState } from 'react';

const useCheckbox = (initialState: boolean = false) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return {
    isChecked,
    toggleCheckbox,
    setIsChecked,
  };
};
export default useCheckbox;
