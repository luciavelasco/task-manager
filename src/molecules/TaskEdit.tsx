import React, { FunctionComponent } from 'react'
import './Task.css'
import { ITask } from '../dummyData'
import { Pill } from '../atoms/Pill'
import { ExpandBar } from '../atoms/ExpandBar'
import { Label } from '../atoms/Label'

export interface ITaskOwnProps {
  task: ITask
}

const getDateText = (task: ITask) => task.timestamp.getDate() === new Date().getDate() ?
  'Today' : task.timestamp.getDate()

export const TaskEdit: FunctionComponent<ITaskOwnProps> = ({ task }) =>
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
    <ExpandBar>{task.taskdescription}</ExpandBar>
  </div>

