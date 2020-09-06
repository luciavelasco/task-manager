import React, { Reducer, useReducer, useState } from 'react'
import './App.css'
import { ITask, tasks } from './dummyData'
import { Task } from './molecules/Task'
import { TaskEdit } from './molecules/TaskEdit'
import { TaskButton } from './atoms/TaskButton'

interface ITaskState {
  [ id: string ]: ITask
}

interface IAction<T, P> {
  type: T,
  payload: P
}

export enum ActionEnum {
  UpdateTask,
  CreateTask,
  DeleteTask,
  GetTasksByOrganisation
}

type TActions =
  IAction<ActionEnum.UpdateTask, { id: string, task: ITask }>
  | IAction<ActionEnum.CreateTask, ITask>
  | IAction<ActionEnum.DeleteTask, { id: string }>
  | IAction<ActionEnum.GetTasksByOrganisation, { organisationId: number }>

// Ordinarily I would have a reducer directory with files for sub-reducers, but for the purposes of
// a compact entrypoint to review this code, I have provided the reducer (and relevant types, Enums
// and interfaces) here
const reducer: Reducer<ITaskState, TActions> = (prevState, action) => {
  switch (action.type) {
    case ActionEnum.UpdateTask:
      return { ...prevState, [ action.payload.id ]: action.payload.task }
    case ActionEnum.CreateTask:
      return { ...prevState, [ Object.keys(prevState).length ]: action.payload }
    case ActionEnum.DeleteTask:
      // to avoid mutation
      const newState = { ...prevState }
      delete newState[ action.payload.id ]
      return newState
    case ActionEnum.GetTasksByOrganisation:
      // Goes to the api and gets the task by the organisation
      // which updates the states in the App view.
      // The same for Tasks by caller, latest task, etc
      return prevState
    default:
      return prevState
  }
}

function App() {
  const [ createOpen, setCreateOpen ] = useState(false)
  // ordinarily would be populated by an async request to the API
  const initialState = tasks.reduce((prev, task, i) => ({ ...prev, [ i ]: task }), {})
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-body">

        {/* If this were a larger app with routing I would pull the router in here */}
        {createOpen ? <TaskEdit
            onSave={newTask => {
              dispatch({ type: ActionEnum.CreateTask, payload: newTask })
              setCreateOpen(false)
            }}
            onClose={() => setCreateOpen(false)}/>
          :
          <>
            <TaskButton className={'create-button'} onClick={() => setCreateOpen(true)}>
              Create New Task
            </TaskButton>

            {Object.keys(state).reverse().map((taskId, i) =>
              <Task
                key={i}
                task={state[ taskId ]}
                onEdit={(newTask) =>
                  dispatch({ type: ActionEnum.UpdateTask, payload: { id: taskId, task: newTask } })}
              />)}

          </>}
      </main>
    </div>
  )
}

export default App
