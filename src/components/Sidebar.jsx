import React from "react";

const menuItems = [
  { name: "Calendar", icon: "fa-calendar" },
  { name: "Events", icon: "fa-calendar-check" },
  { name: "Activities", icon: "fa-running" },
  { name: "Settings", icon: "fa-cog" },
  { name: "Profile", icon: "fa-user" },
];

export default function Sidebar({ darkMode, setDarkMode }) {
  return (
    <aside className="sidebar static-sidebar">
      <div className="profile">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="username">Philip Dunphy</h2>
      </div>
      <nav className="nav-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <i
                className={`fas ${item.icon}`}
                style={{ marginRight: "8px" }}
              ></i>
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="toggle-btn"
        aria-label="Toggle Dark Mode"
      >
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        <span style={{ marginLeft: "8px" }}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </aside>
  );
}
