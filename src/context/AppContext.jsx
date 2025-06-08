import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState('light');
  
  // Active section state for navigation highlighting
  const [activeSection, setActiveSection] = useState('hero');
  
  // Loading state for async operations
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state for error handling
  const [error, setError] = useState(null);

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Update active section
  const updateActiveSection = (section) => {
    setActiveSection(section);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    theme,
    toggleTheme,
    activeSection,
    updateActiveSection,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 