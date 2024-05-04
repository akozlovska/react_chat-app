import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const usePageError = (): [string, Dispatch<SetStateAction<any>>] => {
  const [error, setError] = useState('');

  const setErrorMessage = (err: any) => {
    if (typeof err === 'string') {
      setError(err);
    } else if (err instanceof AxiosError) {
      setError(err.response?.data?.message);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Unknown error');
    }
  };

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return [error, setErrorMessage];
};
