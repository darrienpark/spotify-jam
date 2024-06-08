"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

import Login from "@/components/login";
import WebPlayback from "@/components/web-playback";

const socket = io("http://localhost:3001");

export default function Home() {
  const [input, setInput] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    socket.on("input", (message: string) => {
      setInput(message);
    });

    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  function changeHandler(e: ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value);
    socket.emit("input", e.target.value);
  }

  return (
    <>
      <header></header>
      <main>
        <input value={input} onChange={changeHandler} />

        {token === "" ? <Login /> : <WebPlayback token={token} />}
      </main>
    </>
  );
}
