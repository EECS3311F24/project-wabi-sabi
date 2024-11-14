import { useCallback, useEffect } from 'react';

// calls backend to save study session
export const addStudySession = async (startTime: string, endTime: string, authToken: string | null) => {
  const response = await fetch('http://localhost:5000/study/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
    body: JSON.stringify({ start_time: startTime, end_time: endTime }),
  });
  return response;
};

// sends cached data to backend
export const sendCachedData = (authToken: string) => {
  const CACHE_KEY_START = 'unsavedStart';
  const CACHE_KEY_END = 'unsavedEnd';

  const cachedStart = localStorage.getItem(CACHE_KEY_START);
  const cachedEnd = localStorage.getItem(CACHE_KEY_END);

  if (cachedStart && cachedEnd) {
    addStudySession(cachedStart, cachedEnd, authToken).then((success) => {
      if (success) {
        console.log('we have done it');
        localStorage.removeItem(CACHE_KEY_START);
        localStorage.removeItem(CACHE_KEY_END);
      }
    });
  }
};

interface UseSaveDataOnReloadProps {
  timeLastStarted: Date;
  isActive: boolean;
}

// is called when user reloads page, getting last saved study session from cache
export const useSaveDataOnReload = ({ timeLastStarted, isActive }: UseSaveDataOnReloadProps) => {
  const CACHE_KEY_START = 'unsavedStart';
  const CACHE_KEY_END = 'unsavedEnd';

  // saves last study duration to cache
  const saveDataToCache = useCallback(() => {
    localStorage.setItem(CACHE_KEY_START, timeLastStarted.toISOString());
    localStorage.setItem(CACHE_KEY_END, new Date().toISOString());
  }, [timeLastStarted]);

  // save data before user reloads the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isActive) {
        saveDataToCache();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isActive, saveDataToCache, timeLastStarted]);
};
