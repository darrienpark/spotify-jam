"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("input", (message: string) => {
      setInput(message);
    });
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
      </main>
    </>
  );
}
