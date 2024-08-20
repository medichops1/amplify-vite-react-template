import React from "react";
import { Link } from "react-router-dom";

interface SideBarProps {
  userRole: string | null;
  setCurrentView: (view: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ userRole, setCurrentView }) => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <button onClick={() => setCurrentView("dashboard")}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => setCurrentView("recordings")}>
            Recordings
          </button>
        </li>
        <li>
          <button onClick={() => setCurrentView("settings")}>Settings</button>
        </li>
        {userRole === "ADMINISTRATOR" && (
          <li>
            <button onClick={() => setCurrentView("user-management")}>
              User Management
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideBar;
