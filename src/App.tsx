import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/api';
import { type Schema } from '@/amplify/data/resource';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard';
import Recordings from './components/Recordings';
import Settings from './components/Settings';
import UserManagement from './components/UserManagement';

const client = generateClient<Schema>();

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Fetch user role from your backend or Cognito
    // This is a placeholder and should be replaced with actual role fetching logic
    const fetchUserRole = async () => {
      // Placeholder: replace with actual API call
      setUserRole('ADMINISTRATOR');
    };
    fetchUserRole();
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'recordings':
        return <Recordings />;
      case 'settings':
        return <Settings />;
      case 'user-management':
        return userRole === 'ADMINISTRATOR' ? <UserManagement /> : null;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app-container">
          <TopBar signOut={signOut} user={user} />
          <div className="main-content">
            <SideBar userRole={userRole} setCurrentView={setCurrentView} />
            <div className="view-container">
              {renderView()}
            </div>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;