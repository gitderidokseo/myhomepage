import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./styles.css";
import Home from "./Home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
    <Analytics />
  </StrictMode>,
);
