import useAuth from "@/hooks/useAuth";
import React from "react";

export default function Dashboard({ code }: { code: string }) {
  const accessToken = useAuth(code);
  return <div>{code}</div>;
}
