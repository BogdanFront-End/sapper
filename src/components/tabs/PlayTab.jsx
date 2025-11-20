import React, { useState, useCallback } from 'react';
import GameField from '../game/GameField';
import BetButtons from '../game/BetButtons';
import BankInfo from '../game/BankInfo';
import HowToPlay from '../game/HowToPlay';

const PlayTab = ({ gameState }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const scrollToHowToPlay = useCallback(() => {
    setShowHowToPlay(true);
    setTimeout(() => {
      const element = document.getElementById('howToPlayFull');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <div className="tab-content active" id="playTab">
      <div className="game-container">
        <div className="game-header">
          <div className="game-title">SAPPER GAME</div>
          <div className="balance-card">
            <div className="balance-label">
              <img src="/static/images/gold.gif" alt="💰" className="gold-gif" />
              Ваш баланс
            </div>
            <div className="balance-value" id="balance">1.0 TON</div>
            
            {/* Мини-версия "Как играть?" */}
            <div className="how-to-play-mini" onClick={scrollToHowToPlay}>
              🏆 Как играть? <span className="arrow-left">←</span>
            </div>
          </div>
        </div>
        
        {/* Кнопки ставок */}
        <BetButtons 
          selectedBet={gameState.selectedBet}
          onSelectBet={gameState.selectBet}
        />
        
        {/* Информация о банке и таймере */}
        <BankInfo 
          bank={gameState.bank}
          timer={gameState.timer}
          lastCell={gameState.lastCell}
          isGameActive={gameState.isGameActive}
        />
        
        {/* Игровое поле */}
        <GameField 
          gameField={gameState.gameField}
          onCellClick={gameState.openCell}
          disabled={!gameState.isGameActive}
        />
        
        {/* Статус игры */}
        <div className="status-card" id="status">
          {gameState.isGameActive 
            ? (gameState.lastCell 
                ? `Открыта клетка №${gameState.lastCell.cellNumber}`
                : 'Выберите клетку для начала игры'
              )
            : 'Игра завершена - выберите ставку для новой игры'
          }
        </div>
        
        {/* Инструкции "Как играть?" */}
        <HowToPlay showHowToPlay={showHowToPlay} />
        
        {/* Блок заданий в игре */}
        <div className="game-tasks-block">
          <div className="game-tasks-text">
            Выполняй задания, приглашай друзей и открывай клетки бесплатно! 🎉
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayTab;