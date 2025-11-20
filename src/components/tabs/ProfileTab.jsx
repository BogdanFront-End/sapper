import React from 'react';

const ProfileTab = ({ user }) => {
  return (
    <div className="tab-content" id="profileTab">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="fallback">👤</div>
          </div>
          <div className="profile-username">{user.username}</div>
          <div className="profile-balance">{user.balance} TON</div>
          <div className="profile-label">
            <img src="/static/images/gold.gif" alt="💰" className="gold-gif" />
            Ваш баланс
          </div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
          Профиль загружается...
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;