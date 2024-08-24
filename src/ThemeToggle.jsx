import { FaSun, FaMoon } from "react-icons/fa";
import { useGlobalContext } from "./context";
const ThemeToggle = () => {
  const { darkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <div className="theme-icon-container">
      <section className="toggle-container">
        <button
          id="theme-btn"
          onClick={toggleDarkTheme}
          className="dark-toggle"
        >
          {darkTheme ? (
            <FaSun className="toggle-icon" />
          ) : (
            <FaMoon className="toggle-icon" />
          )}
        </button>
      </section>
    </div>
  );
};
export default ThemeToggle;
