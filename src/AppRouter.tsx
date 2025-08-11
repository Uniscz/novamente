
// src/AppRouter.tsx
import React, { useEffect, useState } from "react";
import LandingPremium from "./LandingPremium";
import { LoginPage } from "./pages/LoginPage";
import { AlunoPage } from "./pages/AlunoPage";
import { CursoPage } from "./pages/CursoPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AdminPage } from "./pages/AdminPage";

function normalize(hash: string) {
  if (!hash || hash === "" || hash === "#" || hash === "#/") return "#/";
  return hash;
}

export default function AppRouter() {
  const [route, setRoute] = useState<string>(normalize(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(normalize(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  switch (route) {
    case "#/login":
      return <LoginPage />;
    case "#/aluno":
      return <AlunoPage />;
    case "#/curso":
      return <CursoPage />;
    case "#/checkout":
      return <CheckoutPage />;
    case "#/admin":
      return <AdminPage />;
    case "#/":
    default:
      return <LandingPremium />;
  }
}
