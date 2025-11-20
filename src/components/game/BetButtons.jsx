import React from 'react';

const BetButtons = ({ selectedBet, onSelectBet }) => {
  const betOptions = [
    { value: 0.1, label: '0.1 TON', className: 'bet-btn-01ton' },
    { value: 0.5, label: '0.5 TON', className: 'bet-btn-05ton' },
    { value: 1.0, label: '1 TON', className: 'bet-btn-1ton' }
  ];

  return (
    <div className="bet-buttons">
      {betOptions.map(bet => (
        <button
          key={bet.value}
          className={`bet-btn ${bet.className} ${selectedBet === bet.value ? 'active' : ''}`}
          onClick={() => onSelectBet(bet.value)}
        >
          <i className="fas fa-coins"></i>
          <br />
          {bet.label}
        </button>
      ))}
    </div>
  );
};

export default BetButtons;