import React, { useState, useEffect } from 'react';

const ReferralTab = ({ user }) => {
  const [referralStats, setReferralStats] = useState({
    referralsCount: 0,
    freeMovesCount: 0,
    commissionEarned: 0.00
  });

  const [referralLink, setReferralLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Загрузка данных реферальной системы
    const loadReferralData = async () => {
      try {
        // В реальном приложении: const data = await api.getReferralStats();
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setReferralStats({
          referralsCount: user.referrals || 0,
          freeMovesCount: user.freeMoves || 0,
          commissionEarned: 0.45
        });

        // Генерация реферальной ссылки
        const baseUrl = window.location.origin;
        const referralCode = `ref_${user.id || '12345'}`;
        setReferralLink(`${baseUrl}?ref=${referralCode}`);
      } catch (error) {
        console.error('Failed to load referral data:', error);
      }
    };

    loadReferralData();
  }, [user]);

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // В ReferralTab.jsx замените функцию inviteFriendViaTelegram:

  const inviteFriendViaTelegram = () => {
    const message = `🎮 Присоединяйся к SAPPER GAME!\n\n${referralLink}\n\nИграй и выигрывай TON! 🏆`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('🎮 Присоединяйся к SAPPER GAME!')}`;
    
    // Используем улучшенную функцию из useTelegram
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="tab-content active" id="referralTab">
      <div className="referral-container">
        <div className="referral-header">
          <div className="referral-title">🎁 Реферальная система</div>
          <div className="referral-subtitle">Пригласи 5 друзей и получи бесплатный ход!</div>
        </div>
        
        {/* Единая карточка статистики */}
        <div className="referral-stats">
          <div className="referral-unified-card">
            <div className="referral-unified-title">
              Приглашай друзей и получай 10% с их комиссий 
              <img src="/static/images/money.gif" alt="💸" className="money-gif" />
            </div>
            <div className="referral-unified-stats">
              <div className="referral-unified-item">
                <span className="referral-unified-label">Приглашено друзей:</span>
                <div className="referral-unified-value-container">
                  <span className="referral-unified-value" id="referralsCount">
                    {referralStats.referralsCount}
                  </span>
                  <span className="referral-unified-suffix">👥</span>
                </div>
              </div>
              <div className="referral-unified-item">
                <span className="referral-unified-label">Бесплатные ходы:</span>
                <div className="referral-unified-value-container">
                  <span className="referral-unified-value" id="freeMovesCount">
                    {referralStats.freeMovesCount}
                  </span>
                  <span className="referral-unified-suffix">🎟</span>
                </div>
              </div>
              <div className="referral-unified-item">
                <span className="referral-unified-label">Заработано с рефералов:</span>
                <div className="referral-unified-value-container">
                  <span className="referral-unified-value" id="commissionEarned">
                    {referralStats.commissionEarned.toFixed(2)}
                  </span>
                  <span className="referral-unified-suffix">TON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Реферальная ссылка */}
        <div className="referral-code-section">
          <div className="referral-code-label">Ваша реферальная ссылка:</div>
          <div className="referral-code-container">
            <input 
              type="text" 
              className="referral-code-input" 
              id="referralLinkInput" 
              value={referralLink}
              readOnly 
            />
            <button 
              className={`copy-btn ${copySuccess ? 'success' : ''}`} 
              onClick={copyReferralLink}
            >
              {copySuccess ? '✅' : '📋'}
            </button>
          </div>
          {copySuccess && (
            <div className="copy-success-message">Скопировано в буфер обмена!</div>
          )}
        </div>
        
        {/* Кнопка пригласить друга */}
        <div className="invite-friend-section">
          <button className="invite-friend-btn" onClick={inviteFriendViaTelegram}>
            <i className="fas fa-user-plus"></i> Пригласить друга
          </button>
        </div>
        
        {/* Правила реферальной системы */}
        <div className="referral-rules">
          <div className="referral-rules-title">📋 Правила:</div>
          <div className="referral-rules-list">
            <div className="referral-rule">• Поделитесь реферальной ссылкой с друзьями</div>
            <div className="referral-rule">• Приглашай друзей и получай 10% с их комиссий</div>
            <div className="referral-rule">• За каждых 5 приглашенных друзей вы получаете 1 бесплатный ход</div>
            <div className="referral-rule">• Бесплатный ход можно использовать только для ставки на поле 0.1 TON</div>
            <div className="referral-rule">• При использовании бесплатного хода банк не пополняется</div>
          </div>
        </div>

        {/* Прогресс бесплатных ходов */}
        <div className="free-moves-progress">
          <div className="progress-header">
            <span>До следующего бесплатного хода:</span>
            <span>{5 - (referralStats.referralsCount % 5)}/5 друзей</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(referralStats.referralsCount % 5) * 20}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralTab;