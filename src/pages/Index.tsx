import React, { useState } from 'react';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

interface HistoryRequest {
  _id: string;
  registerNumber: string;
  name: string;
  reason: string;
  createdAt: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<HistoryRequest[]>([]);

  const handleLogin = (registerNumber: string, historyData?: HistoryRequest[]) => {
    setCurrentUser(registerNumber);
    setIsLoggedIn(true);
    if (historyData) {
      setHistoryData(historyData);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setHistoryData([]);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} registerNumber={currentUser} onLogin={handleLogin} historyData={historyData} />;
  }

  return <Login onLogin={handleLogin} />;
};

export default Index;