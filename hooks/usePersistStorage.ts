import { useCallback, useState } from 'react';

const usePersistStorage = (initialData: unknown, key: string) => {
  const [data, setData] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(key) as string);
    }

    return initialData;
  });

  const setValue = useCallback(
    (value: unknown) => {
      setData(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return [data, setValue];
};

export default usePersistStorage;
