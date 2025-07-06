import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Router } from "wouter";

// Configura o base path para o GitHub Pages
const basename = import.meta.env.BASE_URL || '/';

createRoot(document.getElementById("root")!).render(
  <Router base={basename}>
    <App />
  </Router>
);
