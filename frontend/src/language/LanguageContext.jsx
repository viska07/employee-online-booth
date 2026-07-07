import { createContext, useContext, useState } from "react";

import id from "./id";
import en from "./en";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {

  const [currentLanguage, setCurrentLanguage] =
    useState("id");

  const language =
    currentLanguage === "id"
      ? id
      : en;

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}