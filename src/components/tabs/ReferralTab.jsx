import React from 'react';

const ReferralTab = ({ user }) => {
  return (
    <div className="tab-content" id="referralTab">
      <div className="referral-container">
        <div className="referral-header">
          <div className="referral-title">🎁 Реферальная система</div>
          <div className="referral-subtitle">Пригласи 5 друзей и получи бесплатный ход!</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          Реферальная система загружается...
        </div>
      </div>
    </div>
  );
};

export default ReferralTab;