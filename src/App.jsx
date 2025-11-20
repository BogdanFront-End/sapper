import { useState, useEffect, useCallback } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { useGame } from './hooks/useGame'
import { useUser } from './hooks/useUser'
import LoadingScreen from './components/common/LoadingScreen'
import MaintenanceMode from './components/common/MaintenanceMode'
import Navigation from './components/common/Navigation'
import PlayTab from './components/tabs/PlayTab'
import HistoryTab from './components/tabs/HistoryTab'
import ReferralTab from './components/tabs/ReferralTab'
import ProfileTab from './components/tabs/ProfileTab'
import TasksTab from './components/tabs/TasksTab'
import WinnerModal from './components/modals/WinnerModal'

function App() {
  const [activeTab, setActiveTab] = useState('playTab')
  const [isLoading, setIsLoading] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  
  const { initTelegram, telegramWebApp } = useTelegram()
  const { gameState, initGame } = useGame()
  const { user, initUser } = useUser()

  const initializeApp = useCallback(async () => {
    try {
      console.log('Initializing app...')
      
      // Инициализация Telegram Web App
      await initTelegram()
      
      // Инициализация пользователя
      await initUser()
      
      // Инициализация игры
      await initGame()
      
      // Симуляция загрузки ресурсов
      setTimeout(() => {
        setIsLoading(false)
        console.log('App initialized successfully')
      }, 1500)
      
    } catch (error) {
      console.error('App initialization error:', error)
      setIsLoading(false)
    }
  }, [initTelegram, initUser, initGame])

  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  // Проверка режима технических работ
  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        // const response = await api.getMaintenanceStatus()
        // setMaintenanceMode(response.maintenance)
        setMaintenanceMode(false) // временно отключено
      } catch (error) {
        console.error('Maintenance check failed:', error)
      }
    }
    
    checkMaintenance()
  }, [])

  const renderTabContent = () => {
    const tabProps = {
      historyTab: <HistoryTab />,
      playTab: <PlayTab gameState={gameState} />,
      referralTab: <ReferralTab user={user} />,
      profileTab: <ProfileTab user={user} />,
      tasksTab: <TasksTab />
    };

    return (
      <>
        {Object.entries(tabProps).map(([tabId, component]) => (
          <div 
            key={tabId}
            className={`tab-content ${activeTab === tabId ? 'active' : ''}`}
            id={tabId}
          >
            {component}
          </div>
        ))}
      </>
    );
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  if (maintenanceMode) {
    return <MaintenanceMode />
  }

  return (
    <div className="app-container">
      <div className="game-content">
        <div className="main-content">
          {renderTabContent()}
        </div>
        
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {gameState.showWinnerModal && (
          <WinnerModal 
            winner={gameState.winner}
            onClose={() => gameState.setShowWinnerModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App