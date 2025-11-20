import React from 'react';

const WinnerModal = ({ winner, onClose }) => {
  if (!winner) return null;

  return (
    <div className="winner-modal" id="winnerModal" style={{ display: 'block' }}>
      <div className="winner-content">
        <div className="winner-celebration">🎉</div>
        <div className="winner-title">СОРВАЛ БАНК!</div>
        <div className="winner-avatar" id="winnerAvatar">
          <div className="fallback">👤</div>
        </div>
        <div className="winner-name" id="winnerName">{winner.name}</div>
        <div className="winner-cell-info" id="winnerCellInfo">
          Забрал весь банк открыв клетку №{winner.cellId}
        </div>
        <div className="winner-bank" id="winnerBank">{winner.bank} TON</div>
        
        <button 
          className="close-winner-btn" 
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer'
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;