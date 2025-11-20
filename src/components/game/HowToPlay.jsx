import React from 'react';

const HowToPlay = ({ showHowToPlay }) => {
  if (!showHowToPlay) return null;

  return (
    <div className="how-to-play" id="howToPlayFull">
      <h3>
        <img src="/static/images/winers.gif" alt="🏆" className="how-to-play-icon" /> 
        Как играть?
      </h3>
      <p>1. Выберите поле 0.1 0.5 или 1TON.</p>
      <p>2. Откройте любую клетку.</p>
      <div style={{ height: '8px' }}></div>
      <p>🎁 Нашли приз — забираете весь банк!</p>
      <p>💰 Чем больше игроков — тем больше банк.</p>
      <div style={{ height: '8px' }}></div>
      <p>⏳ Если время вышло — банк получает тот, кто открыл клетку последним.</p>
      <p>✨ Первая клетка — без комиссии!</p>
    </div>
  );
};

export default HowToPlay;