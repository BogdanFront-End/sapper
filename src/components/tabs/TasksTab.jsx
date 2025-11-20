import React from 'react';

const TasksTab = () => {
  return (
    <div className="tab-content" id="tasksTab">
      <div className="tasks-container">
        <div className="tasks-header">
          <div className="tasks-title">🎯 Задания</div>
          <div className="tasks-subtitle">Выполняй задания и получай бесплатные ходы!</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          Задания загружаются...
        </div>
      </div>
    </div>
  );
};

export default TasksTab;