import { useState } from 'react';

const useInputState = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return [value, handleChange, setValue];
};

export default useInputState;
