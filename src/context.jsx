import React, { useContext, useState, createContext, useEffect } from "react";

const AppContext = createContext();
export const useGlobalContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Function to get the initial dark mode preference
  const getInitialTheme = () => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedMode = localStorage.getItem("darkTheme");
    return storedMode === "true"
      ? true
      : storedMode === "false"
      ? false
      : darkModeQuery.matches;
  };

  // State to manage dark theme
  const [darkTheme, setDarkTheme] = useState(getInitialTheme());
  const [searchTerm, setSearchTerm] = useState("Dog");

  // Toggle dark theme
  const toggleDarkTheme = () => {
    const newDarkTheme = !darkTheme;
    setDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  // Apply theme on initial load and listen for preference changes
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // Update theme based on user preference
    document.body.classList.toggle("dark-theme", darkTheme);

    // Event listener for changes in the preferred color scheme
    const handleChange = (e) => {
      setDarkTheme(e.matches);
    };

    darkModeQuery.addEventListener("change", handleChange);

    return () => {
      darkModeQuery.removeEventListener("change", handleChange);
    };
  }, [darkTheme]);

  return (
    <AppContext.Provider
      value={{ darkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
