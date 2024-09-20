"use client";

import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";

export default function Home() {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const urlCode = new URLSearchParams(window.location.search).get("code");
    setCode(urlCode);
  }, []);

  return code ? <Dashboard code={code} /> : <Login></Login>;
}
