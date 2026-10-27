import { useState } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const navigationItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/transactions", label: "Transactions" },
  { to: "/budget", label: "Budget" },
  { to: "/currency", label: "Currency" },
];

function Header({ theme, onThemeToggle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenu() {
    setIsMenuOpen((previousState) => !previousState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <div className="nav-brand">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={handleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <Link className="logo" to="/" onClick={() => setIsMenuOpen(false)}>
            <span>ExpenseFlow</span>
          </Link>
        </div>

        <div className="desktop-nav">
          <NavLinks />
        </div>

        <ThemeAction onThemeToggle={onThemeToggle} theme={theme} />

        {isMenuOpen && (
          <div id="mobile-navigation" className="mobile-nav">
            <NavLinks onNavigate={closeMenu} />
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLinks({ onNavigate }) {
  return (
    <ul className="nav-links">
      {navigationItems.map(({ to, label, end }) => (
        <li key={to}>
          <Link
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <span>{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ThemeAction({ onThemeToggle, theme }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onThemeToggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {theme === "dark" ? (
        <FaSun aria-hidden="true" />
      ) : (
        <FaMoon aria-hidden="true" />
      )}
    </button>
  );
}

export default Header;
