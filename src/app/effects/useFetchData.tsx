import { useState, useEffect } from "react";

interface FetchDataResult<T> {
  data: T | null;
  error: Error | null;
  fetchData: () => void; // Function to trigger data fetching
}

function useFetchData<T>(fetchDataFn: () => Promise<T>): FetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const result = await fetchDataFn();
      setData(result);
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    fetchData(); // Trigger data fetching on mount
  }, []);

  return { data, error, fetchData };
}

export default useFetchData;
