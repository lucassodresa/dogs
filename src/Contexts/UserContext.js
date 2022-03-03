import { createContext, useCallback, useEffect, useState } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../Utils/api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setIsLoggedIn(false);
    window.localStorage.removeItem("token");
    navigate("/login");
    console.log("redirecionar");
  }, [navigate]);

  const getUser = useCallback(async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setIsLoggedIn(true);
    console.log(json);
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
      } catch (error) {
        setError(error.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    },
    [getUser]
  );

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Invalid token");
          await getUser(token);
          navigate("/account");
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    })();
  }, [getUser, navigate, userLogout]);

  return (
    <UserContext.Provider
      value={{ data, userLogin, userLogout, isLoggedIn, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
