"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import VisuallyHidden from "../VisuallyHidden";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";
import styles from "@/components/Header/Header.module.css";

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleThemeClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const COLORS = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(COLORS).forEach(([keyframes, value]) => {
      root.style.setProperty(keyframes, value);
    });
  }

  return (
    <button className={styles.action} onClick={handleThemeClick}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
