import { useEffect, useState } from "react";

export default function useAuth(code: string) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);
        window.history.pushState({}, "", "/");
      } catch (error) {
        console.error("Login failed", error);
        window.location.href = "/";
      }
    };

    login();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const refreshInterval = setInterval(async () => {
      try {
        const response = await fetch("http://localhost:3001/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAccessToken(data.accessToken);
        setExpiresIn(data.expiresIn);
      } catch (error) {
        console.error("Token refresh failed", error);
        window.location.href = "/";
      }
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(refreshInterval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
