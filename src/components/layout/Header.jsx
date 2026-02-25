// src/components/layout/Header.jsx
// Top header bar for the Electrician Toolkit.
// Contains title, language toggle, and mobile Tools trigger.

import React from "react";
import { useTranslation } from "react-i18next";

function Header({ onOpenTools }) {
  const { t, i18n } = useTranslation();

  const isSpanish = i18n.language === "es";

  const handleToggleLanguage = () => {
    i18n.changeLanguage(isSpanish ? "en" : "es");
  };

  return (
    <header className="app-header">
      <h1 className="header-title">{t("header.title")}</h1>

      <div className="header-right">
        {/* Mobile-only Tools button */}
        <button type="button" className="header-tools" onClick={onOpenTools}>
          ☰ {t("header.tools")}
        </button>

        {/* Language Toggle */}
        <button
          type="button"
          className="header-lang"
          onClick={handleToggleLanguage}
          aria-label={t("header.language")}
          title={t("header.language")}
        >
          {isSpanish ? "ES" : "EN"}
        </button>

        <a href="https://joeyoyong.com/#projects" className="header-home">
          {t("header.home")}
        </a>
      </div>
    </header>
  );
}

export default Header;
