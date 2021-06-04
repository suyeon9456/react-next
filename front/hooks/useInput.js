import { useCallback, useState } from 'react';

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue)
  const onChangeVlaue = useCallback((e) => {
    setValue(e.target.value)
  }, [])
  return [value, onChangeVlaue]
};

export default useInput;