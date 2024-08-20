import React, { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

interface TopBarProps {
  signOut?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ signOut }) => {
  const [userEmail, setUserEmail] = useState<string>("User");

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setUserEmail(attributes.email || "User");
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    getUserEmail();
  }, []);

  return (
    <header className="top-bar">
      <h1>Call Management System</h1>
      <div className="user-controls">
        <span className="user-email">{userEmail}</span>
        {signOut && (
          <button onClick={signOut} className="sign-out-button">
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default TopBar;
