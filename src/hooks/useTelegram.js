import { useEffect, useState } from 'react';

export const useTelegram = () => {
  const [tg, setTg] = useState(null);

  useEffect(() => {
    const initTelegram = () => {
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        setTg(webApp);
        
        console.log('Initializing Telegram Web App...');

        // Расширяем приложение на весь экран
        try {
          webApp.expand();
          console.log('App expanded successfully');
        } catch (error) {
          console.warn('Failed to expand app:', error);
        }

        // Включаем подтверждение закрытия (только если поддерживается)
        try {
          if (webApp.enableClosingConfirmation) {
            webApp.enableClosingConfirmation();
            console.log('Closing confirmation enabled');
          } else {
            console.warn('Closing confirmation not supported in this version');
          }
        } catch (error) {
          console.warn('Error enabling closing confirmation:', error);
        }

        // Устанавливаем цвет header (только если поддерживается)
        try {
          if (webApp.setHeaderColor) {
            webApp.setHeaderColor('#000000');
            console.log('Header color set');
          } else {
            console.warn('Header color not supported in this version');
          }
        } catch (error) {
          console.warn('Error setting header color:', error);
        }

        // Устанавливаем цвет фона (только если поддерживается)
        try {
          if (webApp.setBackgroundColor) {
            webApp.setBackgroundColor('#ffffff');
            console.log('Background color set');
          } else {
            console.warn('Background color not supported in this version');
          }
        } catch (error) {
          console.warn('Error setting background color:', error);
        }

        console.log('Telegram Web App initialized successfully');
      } else {
        console.error('Telegram Web App not found');
      }
    };

    // Проверяем, загружен ли уже Telegram Web App
    if (window.Telegram?.WebApp) {
      initTelegram();
    } else {
      // Ждем загрузки Telegram Web App
      window.addEventListener('telegram-ready', initTelegram);
      
      // Альтернативно: проверяем периодически
      const checkTelegram = setInterval(() => {
        if (window.Telegram?.WebApp) {
          initTelegram();
          clearInterval(checkTelegram);
        }
      }, 100);

      // Останавливаем проверку через 5 секунд
      setTimeout(() => clearInterval(checkTelegram), 5000);
    }

    return () => {
      window.removeEventListener('telegram-ready', initTelegram);
    };
  }, []);

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
  };
};