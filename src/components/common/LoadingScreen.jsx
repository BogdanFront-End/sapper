import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-icon"></div>
      <div className="loading-text">SAPPER GAME</div>
      <div className="loading-subtext">Загрузка...</div>
      <div className="loading-bar">
        <div className="loading-progress" id="loadingProgress"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;