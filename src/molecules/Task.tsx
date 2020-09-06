import React, { FunctionComponent, useState } from 'react'
import './Task.css'
import { ITask } from '../dummyData'
import { Pill } from '../atoms/Pill'
import { Label } from '../atoms/Label'
import { TaskButton } from '../atoms/TaskButton'
import { TaskEdit } from './TaskEdit'

export interface ITaskOwnProps {
  task: ITask,
  onEdit: (newTask: ITask) => any
}

const getDateText = (task: ITask) => task.timestamp.getDate() === new Date().getDate() ?
  'Today' : task.timestamp.getDate()

export const Task: FunctionComponent<ITaskOwnProps> = ({ task, onEdit }) => {
  const [ isEditing, setIsEditing ] = useState(false)
  // const [ taskState, setTask ] = useState(task)
  const [ isExpanded, setExpansion ] = useState(false)

  return isEditing ?
    <TaskEdit
      onClose={() => setIsEditing(false)}
      task={task}
      onSave={newTask => {
        onEdit(newTask)
        setIsEditing(false)
      }}/>
    : (
      <div className={[ task.priority, 'task' ].join(' ')}>
        <p className="summary">{task.tasksummary}</p>
        <div className="task-line">
          <Label label="Time" value={`${task.timestamp.toLocaleTimeString().slice(0, -3)} ${getDateText(task)}`}/>
          <Label label="Status" value={task.taskStatus}/>
          <Pill>{task.priority.toLowerCase()}</Pill>
        </div>
        <div className="task-line">
          <Label label="Vehicle ID" value={task.assignedto}/>
          <Label label="Lat" value={task.latitude}/>
          <Label label="Lon" value={task.longitude}/>
        </div>
        <div className="task-buttons expand-bar">
          <TaskButton className='see-more-button' onClick={() => setExpansion(!isExpanded)}>See more</TaskButton>
          <TaskButton className='edit-button' onClick={() => setIsEditing(true)}>Edit</TaskButton>
        </div>
        {isExpanded && <div className="expand-contents">{task.taskdescription}</div>}
      </div>
    )
}
