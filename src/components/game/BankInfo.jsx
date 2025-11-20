import React from 'react';

const BankInfo = ({ bank, timer, lastCell, isGameActive }) => {
  if (!isGameActive && bank === 0) {
    return null;
  }

  return (
    <div className="bank-info" id="bankInfo" style={{ display: 'block' }}>
      <div className="bank-row">
        <div className="last-cell-info">
          <div className="last-cell-label" id="lastCellLabel">
            {lastCell ? 'Открыл' : 'Открыл'}
          </div>
        </div>
        <div className="bank-center">
          <div className="bank-label">
            <img src="/static/images/gold.gif" alt="💰" className="gold-gif" />
            Текущий банк
          </div>
        </div>
        <div className="timer-section">
          <div className="timer-label">Таймер:</div>
        </div>
      </div>
      <div className="bank-row">
        <div className="last-cell-info">
          <div className="last-cell-info-combined" id="lastCellInfoCombined">
            {lastCell ? `№${lastCell.cellNumber} - ${lastCell.player}` : '№- -'}
          </div>
        </div>
        <div className="bank-center">
          <div className="bank-value" id="bankValue">{bank.toFixed(1)} TON</div>
        </div>
        <div className="timer-section">
          <div className="timer-value" id="timerValue">{timer}</div>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;