import { createContext, useCallback, useEffect, useState } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../Utils/api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setIsLoggedIn(false);
    window.localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const getUser = useCallback(async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setIsLoggedIn(true);
  }, []);

  const userLogin = useCallback(
    async (username, password) => {
      try {
        setError(null);
        setLoading(true);
        const { url, options } = TOKEN_POST({ username, password });
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error: Invalid Credentials`);
        const { token } = await response.json();
        window.localStorage.setItem("token", token);
        await getUser(token);
        navigate("/account");
      } catch (error) {
        setError(error.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    },
    [getUser, navigate]
  );

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem("token");

      if (!loading && !isLoggedIn) {
        if (token) {
          try {
            setError(null);
            setLoading(true);
            const { url, options } = TOKEN_VALIDATE_POST(token);
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Invalid token");
            await getUser(token);
          } catch (error) {
            userLogout();
          } finally {
            setLoading(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      }
    })();
  }, [navigate, getUser, userLogout, isLoggedIn, loading]);

  return (
    <UserContext.Provider
      value={{ data, userLogin, userLogout, isLoggedIn, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
