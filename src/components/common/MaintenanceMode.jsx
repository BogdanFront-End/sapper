import React, { useEffect, useRef } from 'react';

const MaintenanceMode = () => {
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    // В реальном приложении здесь будет инициализация Lottie анимации
    const loadLottieAnimation = async () => {
      try {
        if (window.lottie && lottieContainerRef.current) {
          // Загрузка анимации технических работ
          // await window.lottie.loadAnimation({
          //   container: lottieContainerRef.current,
          //   renderer: 'svg',
          //   loop: true,
          //   autoplay: true,
          //   path: '/static/animations/maintenance.json'
          // });
        }
      } catch (error) {
        console.error('Failed to load maintenance animation:', error);
      }
    };

    loadLottieAnimation();
  }, []);

  return (
    <div className="maintenance-mode" id="maintenanceMode">
      <div className="maintenance-header">Технические работы <span className="emoji">🔨</span></div>
      <div className="maintenance-icon" id="maintenanceLottie" ref={lottieContainerRef}>
        {/* Fallback иконка */}
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>⚙️</div>
      </div>
      <div className="maintenance-text">SAPPER GAME</div>
      <div className="maintenance-message">Мы проводим технические работы <span className="emoji">⚙️</span></div>
      <div className="maintenance-message" style={{ marginBottom: '0' }}>
        Возвращайтесь позже <span className="emoji">🏆</span>
      </div>
    </div>
  );
};

export default MaintenanceMode;