import React from 'react'
import './App.css'
import { dummyTask, PriorityEnum, StatusEnum, tasks } from './dummyData'
import { Task } from './molecules/Task'
import { TaskEdit } from './molecules/TaskEdit'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-body">
        <TaskEdit task={dummyTask(PriorityEnum.MEDIUM, StatusEnum.Assigned)} />
        {tasks.map(t => <Task task={t}/> )}
      </main>
    </div>
  );
}

export default App;
