import React from 'react';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'historyTab', icon: 'fas fa-chart-line', label: 'История игр' },
    { id: 'playTab', icon: 'fas fa-gamepad', label: 'Играть' },
    { id: 'referralTab', icon: 'fas fa-gift', label: 'Рефералы' },
    { id: 'profileTab', icon: 'fas fa-user', label: 'Профиль' }
  ];

  const handleTabClick = (tabId, event) => {
    event.preventDefault();
    onTabChange(tabId);
  };

  return (
    <div className="bottom-navigation">
      <div className="nav-buttons">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={(e) => handleTabClick(tab.id, e)}
            aria-label={tab.label}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <div className="nav-icon">
              <i className={tab.icon}></i>
            </div>
            <div>{tab.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;