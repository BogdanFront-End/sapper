import { useState, useCallback } from 'react';

export const useUser = () => {
  const [user, setUser] = useState({
    id: null,
    username: 'Пользователь',
    balance: 1.0,
    gamesPlayed: 0,
    gamesWon: 0,
    referrals: 0,
    freeMoves: 0,
    walletConnected: false,
    walletAddress: null
  });

  const initUser = useCallback(async () => {
    try {
      // В реальном приложении здесь будет запрос к API для получения данных пользователя
      // const userData = await api.getUserProfile();
      
      // Заглушка с тестовыми данными
      const mockUserData = {
        id: '12345',
        username: 'TelegramUser',
        balance: 1.0,
        gamesPlayed: 15,
        gamesWon: 3,
        referrals: 2,
        freeMoves: 1,
        walletConnected: false,
        walletAddress: null
      };
      
      setUser(mockUserData);
      console.log('User initialized:', mockUserData);
    } catch (error) {
      console.error('Failed to initialize user:', error);
    }
  }, []);

  const updateBalance = useCallback((newBalance) => {
    setUser(prev => ({ ...prev, balance: newBalance }));
  }, []);

  const connectWallet = useCallback((address) => {
    setUser(prev => ({
      ...prev,
      walletConnected: true,
      walletAddress: address
    }));
  }, []);

  const disconnectWallet = useCallback(() => {
    setUser(prev => ({
      ...prev,
      walletConnected: false,
      walletAddress: null
    }));
  }, []);

  const addFreeMove = useCallback(() => {
    setUser(prev => ({
      ...prev,
      freeMoves: prev.freeMoves + 1
    }));
  }, []);

  return {
    user,
    initUser,
    updateBalance,
    connectWallet,
    disconnectWallet,
    addFreeMove
  };
};