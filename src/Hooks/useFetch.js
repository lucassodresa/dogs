import { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const request = useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (!response?.ok) throw new Error(json.message);
    } catch (error) {
      json = null;
      setError(error.message);
    } finally {
      setData(json);
      setLoading(false);
      console.log("fez login");
    }
    return { response, json };
  }, []);

  return { data, loading, error, request };
};

export default useFetch;
