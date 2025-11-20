import React from 'react';

const GameField = ({ gameField, onCellClick, disabled }) => {
  const handleCellClick = (cellId) => {
    if (!disabled) {
      onCellClick(cellId);
    }
  };

  const getCellContent = (cell) => {
    if (!cell.isOpened) {
      return cell.number;
    }
    
    if (cell.isPrize) {
      return '🎁';
    }
    
    return '💣';
  };

  const getCellClassName = (cell) => {
    let className = 'game-cell';
    
    if (cell.isOpened) {
      className += ' opened';
      if (cell.isPrize) {
        className += ' prize';
      } else {
        className += ' bomb';
      }
    }
    
    if (disabled && !cell.isOpened) {
      className += ' disabled';
    }
    
    return className;
  };

  return (
    <div className="game-field" id="gameField">
      {gameField.map(cell => (
        <div
          key={cell.id}
          className={getCellClassName(cell)}
          onClick={() => handleCellClick(cell.id)}
        >
          {getCellContent(cell)}
        </div>
      ))}
    </div>
  );
};

export default GameField;