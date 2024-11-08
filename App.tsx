import React, { useState, useRef } from 'react';
import { Home, Search, Settings, User, MapPin, Phone, Mail, RefreshCw, LogOut, Filter, X, Loader, Bell, ChevronDown, Shield, Clock, Database } from 'lucide-react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useAuthStore } from './store/authStore';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { TabButton } from './components/TabButton';
import { StatsCard } from './components/StatsCard';
import { ActivityLog } from './components/ActivityLog';
import { SearchFilters } from './components/SearchFilters';
import { SettingsCard } from './components/SettingsCard';
import { NotificationCenter } from './components/NotificationCenter';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const homeRef = useRef(null);
  const searchRef = useRef(null);
  const settingsRef = useRef(null);

  const handleSearch = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!searchValue.trim()) {
      setError('Please enter a valid value');
      return;
    }
    setError('');
    // Handle search logic here
  };

  const tabs = {
    home: (
      <div ref={homeRef} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 glass rounded-full glass-hover"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {showNotifications && <NotificationCenter />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            icon={Search}
            title="Total Searches"
            value="1,234"
            trend="up"
            trendValue="12%"
          />
          <StatsCard
            icon={User}
            title="Active Users"
            value="856"
            trend="up"
            trendValue="8%"
          />
          <StatsCard
            icon={Database}
            title="Data Sources"
            value="24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityLog />
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 glass rounded-lg glass-hover text-left">
                <Shield className="mb-2 text-blue-500" size={24} />
                <h4 className="font-medium">Security Check</h4>
                <p className="text-sm text-gray-400">Run a quick scan</p>
              </button>
              <button className="p-4 glass rounded-lg glass-hover text-left">
                <Clock className="mb-2 text-purple-500" size={24} />
                <h4 className="font-medium">Schedule Search</h4>
                <p className="text-sm text-gray-400">Set up automated searches</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    search: (
      <div ref={searchRef} className="space-y-6">
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {[
            { type: 'name', icon: User, label: 'Name' },
            { type: 'address', icon: MapPin, label: 'Address' },
            { type: 'phone', icon: Phone, label: 'Phone' },
            { type: 'email', icon: Mail, label: 'Email' },
          ].map(({ type, icon, label }) => (
            <TabButton
              key={type}
              icon={icon}
              label={label}
              active={searchType === type}
              onClick={() => setSearchType(type)}
            />
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Enter ${searchType} to search...`}
            className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Search
          </button>
        </div>

        <SearchFilters />

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>
    ),
    settings: (
      <div ref={settingsRef} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingsCard
            icon={User}
            title="Profile Settings"
          >
            {isAuthenticated ? (
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 glass rounded-lg glass-hover">
                  Change Username
                </button>
                <button className="w-full text-left px-4 py-2 glass rounded-lg glass-hover">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-2 glass rounded-lg glass-hover">
                  Update Profile Picture
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full text-left px-4 py-2 glass rounded-lg glass-hover"
              >
                Login to manage profile
              </button>
            )}
          </SettingsCard>

          <SettingsCard
            icon={Settings}
            title="Preferences"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between px-4 py-2 glass rounded-lg">
                <span>Dark Mode</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-600'
                  } relative`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      darkMode ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between px-4 py-2 glass rounded-lg">
                <span>Notifications</span>
                <button className="w-12 h-6 rounded-full bg-blue-600 relative">
                  <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
              <div className="flex items-center justify-between px-4 py-2 glass rounded-lg">
                <span>Two-Factor Auth</span>
                <button className="w-12 h-6 rounded-full bg-gray-600 relative">
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white" />
                </button>
              </div>
            </div>
          </SettingsCard>
        </div>
      </div>
    ),
  };

  const nodeRef = activeTab === 'home' ? homeRef : activeTab === 'search' ? searchRef : settingsRef;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white transition-colors`}>
      <Header onLoginClick={() => setShowLoginModal(true)} />

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            ClearIntel
          </h1>

          <div className="glass rounded-2xl p-6 shadow-xl">
            <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-2">
              {[
                { tab: 'home', icon: Home, label: 'Home' },
                { tab: 'search', icon: Search, label: 'Search' },
                { tab: 'settings', icon: Settings, label: 'Settings' },
              ].map(({ tab, icon, label }) => (
                <TabButton
                  key={tab}
                  icon={icon}
                  label={label}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </div>

            <SwitchTransition>
              <CSSTransition
                key={activeTab}
                nodeRef={nodeRef}
                timeout={300}
                classNames="fade"
              >
                <div>
                  {tabs[activeTab as keyof typeof tabs]}
                </div>
              </CSSTransition>
            </SwitchTransition>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => window.location.reload()}
                className="text-gray-400 hover:text-white transition-all"
              >
                <RefreshCw size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;