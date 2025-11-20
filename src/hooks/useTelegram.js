import { useState, useEffect } from 'react';

export const useTelegram = () => {
  const [telegramWebApp, setTelegramWebApp] = useState(null);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initTelegram = async () => {
    return new Promise((resolve) => {
      try {
        if (window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;
          
          // Инициализация Telegram Web App
          tg.expand();
          tg.enableClosingConfirmation();
          tg.setHeaderColor('#0f0f1a');
          tg.setBackgroundColor('#0f0f1a');
          
          // Получаем данные пользователя
          const userData = tg.initDataUnsafe?.user;
          if (userData) {
            setUser({
              id: userData.id,
              firstName: userData.first_name,
              lastName: userData.last_name,
              username: userData.username,
              languageCode: userData.language_code,
              isPremium: userData.is_premium
            });
          }

          setTelegramWebApp(tg);
          setIsInitialized(true);
          
          console.log('Telegram Web App initialized successfully');
          resolve(tg);
        } else {
          console.warn('Telegram Web App not available - running in browser mode');
          // Заглушка для разработки вне Telegram
          setTelegramWebApp({
            expand: () => console.log('Telegram: expand'),
            enableClosingConfirmation: () => console.log('Telegram: enableClosingConfirmation'),
            setHeaderColor: () => console.log('Telegram: setHeaderColor'),
            setBackgroundColor: () => console.log('Telegram: setBackgroundColor'),
            initDataUnsafe: { user: null }
          });
          setIsInitialized(true);
          resolve(null);
        }
      } catch (error) {
        console.error('Failed to initialize Telegram Web App:', error);
        setIsInitialized(true);
        resolve(null);
      }
    });
  };

  // Функция для отправки данных в Telegram
  const sendDataToTelegram = (data) => {
    if (telegramWebApp) {
      telegramWebApp.sendData(JSON.stringify(data));
    }
  };

  // Функция для закрытия приложения
  const closeApp = () => {
    if (telegramWebApp) {
      telegramWebApp.close();
    }
  };

  return {
    telegramWebApp,
    user,
    isInitialized,
    initTelegram,
    sendDataToTelegram,
    closeApp
  };
};