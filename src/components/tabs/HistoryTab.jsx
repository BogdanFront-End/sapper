import React, { useState, useEffect } from 'react';

const HistoryTab = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Моковые данные для истории игр
  const mockHistory = [
    {
      id: 1,
      player: 'Alex',
      bet: 0.1,
      bank: 2.5,
      cell: 12,
      prize: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 минут назад
      avatar: null
    },
    {
      id: 2,
      player: 'Maria',
      bet: 0.5,
      bank: 8.7,
      cell: 7,
      prize: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 минут назад
      avatar: null
    },
    {
      id: 3,
      player: 'John',
      bet: 1.0,
      bank: 15.2,
      cell: 19,
      prize: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
      avatar: null
    },
    {
      id: 4,
      player: 'You',
      bet: 0.1,
      bank: 1.8,
      cell: 3,
      prize: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 час назад
      avatar: null
    },
    {
      id: 5,
      player: 'Mike',
      bet: 0.5,
      bank: 12.3,
      cell: 22,
      prize: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 часа назад
      avatar: null
    }
  ];

  useEffect(() => {
    // Имитация загрузки данных
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        // В реальном приложении: const data = await api.getGameHistory();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setHistory(mockHistory);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const setFilter = (filter) => {
    setActiveFilter(filter);
  };

  const filteredHistory = history.filter(game => {
    switch (activeFilter) {
      case 'lucky':
        return game.prize;
      case 'big':
        return game.bank >= 10;
      case 'all':
      default:
        return true;
    }
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    return `${days} дн назад`;
  };

  const getBetClass = (bet) => {
    if (bet === 0.1) return 'history-bet-01';
    if (bet === 0.5) return 'history-bet-05';
    return 'history-bet-1';
  };

  if (isLoading) {
    return (
      <div className="tab-content active" id="historyTab">
        <div className="history-container">
          <div className="history-header">
            <i className="fas fa-chart-line" style={{ color: '#00aaff', fontSize: '24px' }}></i>
            <div className="history-title">История игр</div>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            <div className="loading-icon" style={{ width: '40px', height: '40px', margin: '0 auto 20px' }}></div>
            Загрузка истории...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content active" id="historyTab">
      <div className="history-container">
        <div className="history-header">
          <i className="fas fa-chart-line" style={{ color: '#00aaff', fontSize: '24px' }}></i>
          <div className="history-title">История игр</div>
        </div>
        
        {/* Фильтры */}
        <div className="history-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            data-filter="all"
          >
            <i className="fas fa-list"></i> Все
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'lucky' ? 'active' : ''}`}
            onClick={() => setFilter('lucky')}
            data-filter="lucky"
          >
            🍀 Везучие
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'big' ? 'active' : ''}`}
            onClick={() => setFilter('big')}
            data-filter="big"
          >
            💰 Большие
          </button>
        </div>
        
        <div id="historyContainer">
          {filteredHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              {activeFilter === 'all' 
                ? 'История игр пуста' 
                : `Нет игр по фильтру "${getFilterLabel(activeFilter)}"`
              }
            </div>
          ) : (
            <div className="history-list">
              {filteredHistory.map(game => (
                <div key={game.id} className="history-item">
                  <div className="history-item-left">
                    <div className="history-avatar">
                      {game.avatar ? (
                        <img src={game.avatar} alt={game.player} />
                      ) : (
                        <div className="fallback">👤</div>
                      )}
                    </div>
                    <div className="history-player-info">
                      <div className="history-player-name">
                        {game.player}
                        {game.player === 'You' && <span className="you-badge"> Вы</span>}
                      </div>
                      <div className="history-time">{formatTime(game.timestamp)}</div>
                    </div>
                  </div>
                  
                  <div className="history-item-right">
                    <div className="history-cell-info">
                      Клетка <span className="cell-number">№{game.cell}</span>
                    </div>
                    <div className="history-bet-amount">
                      Ставка: <span className={getBetClass(game.bet)}>{game.bet} TON</span>
                    </div>
                    <div className="history-bank">
                      Банк: <span className="bank-amount">{game.bank} TON</span>
                    </div>
                    {game.prize && <div className="prize-badge">🎁 ПРИЗ</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для получения названия фильтра
const getFilterLabel = (filter) => {
  switch (filter) {
    case 'lucky': return 'Везучие';
    case 'big': return 'Большие';
    default: return 'Все';
  }
};

export default HistoryTab;