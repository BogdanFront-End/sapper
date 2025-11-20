import { useState, useEffect, useCallback } from 'react';

export const useGame = () => {
  const [selectedBet, setSelectedBet] = useState(0.1);
  const [gameField, setGameField] = useState([]);
  const [bank, setBank] = useState(0);
  const [timer, setTimer] = useState(300); // 5 минут в секундах
  const [lastCell, setLastCell] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);

  // Инициализация игрового поля
  const initGameField = useCallback((betAmount = selectedBet) => {
    const prizeCellIndex = Math.floor(Math.random() * 25);
    const field = Array.from({ length: 25 }, (_, index) => ({
      id: index,
      number: index + 1,
      isOpened: false,
      isPrize: index === prizeCellIndex,
      player: null,
      betAmount: betAmount
    }));
    
    setGameField(field);
    setBank(0);
    setTimer(300);
    setLastCell(null);
    setIsGameActive(true);
    
    console.log(`Game field initialized with bet: ${betAmount} TON, prize cell: ${prizeCellIndex + 1}`);
  }, [selectedBet]);

  // Выбор ставки
  const handleSelectBet = useCallback((bet) => {
    setSelectedBet(bet);
    initGameField(bet);
  }, [initGameField]);

  // Открытие клетки
  const handleOpenCell = useCallback(async (cellId) => {
    if (!isGameActive) {
      console.warn('Game is not active');
      return;
    }

    const cell = gameField[cellId];
    if (cell.isOpened) {
      console.warn('Cell already opened');
      return;
    }

    // Обновляем состояние клетки
    const updatedField = gameField.map(cell => 
      cell.id === cellId 
        ? { ...cell, isOpened: true, player: 'current' }
        : cell
    );
    
    setGameField(updatedField);
    
    // Обновляем последнюю открытую клетку
    const lastCellInfo = {
      cellNumber: cellId + 1,
      player: 'Вы',
      bet: selectedBet
    };
    setLastCell(lastCellInfo);

    // Увеличиваем банк (в реальном приложении - запрос к API)
    const newBank = bank + selectedBet;
    setBank(newBank);

    // Проверка на выигрыш
    if (cell.isPrize) {
      setIsGameActive(false);
      setWinner({
        name: 'Вы',
        avatar: null,
        bank: newBank,
        cellId: cellId + 1
      });
      setShowWinnerModal(true);
      console.log(`🎉 Prize found! Cell ${cellId + 1}, Bank: ${newBank} TON`);
    }

    // В реальном приложении здесь будет запрос к бекенду
    // try {
    //   await api.openCell(cellId, selectedBet);
    // } catch (error) {
    //   console.error('Failed to open cell:', error);
    // }

  }, [gameField, bank, selectedBet, isGameActive]);

  // Таймер
  useEffect(() => {
    if (!isGameActive || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsGameActive(false);
          
          // Время вышло - последний игрок получает банк
          if (lastCell) {
            setWinner({
              name: lastCell.player,
              avatar: null,
              bank: bank,
              cellId: lastCell.cellNumber
            });
            setShowWinnerModal(true);
            console.log(`⏰ Time's up! Last player ${lastCell.player} wins ${bank} TON`);
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isGameActive, lastCell, bank]);

  // Форматирование времени
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Инициализация игры при загрузке
  const initGame = useCallback(() => {
    initGameField(selectedBet);
    console.log('Game initialized');
  }, [initGameField, selectedBet]);

  return {
    gameState: {
      selectedBet,
      gameField,
      bank,
      timer: formatTime(timer),
      lastCell,
      showWinnerModal,
      winner,
      isGameActive,
      setShowWinnerModal
    },
    initGame,
    selectBet: handleSelectBet,
    openCell: handleOpenCell
  };
};