import React, { FunctionComponent, MouseEventHandler, useState } from 'react'
import './Task.css'
import './TaskEdit.css'
import { availablePriorities, availableStatuses, ITask, PriorityEnum } from '../dummyData'
import DateTimePicker from 'react-datetime-picker'
import { TaskButton } from '../atoms/TaskButton'
import { validateTask } from '../taskValidator'

export interface ITaskOwnProps {
  task?: ITask
  onClose: MouseEventHandler<HTMLDivElement>
  onSave: (newTask: ITask) => any
  className?: string
}

export const emptyTask: Partial<ITask> = ({
  assignedto: '',
  timestamp: new Date(),
  latitude: 0,
  longitude: 0,
  tasksummary: '',
  taskdescription: ''
})

export const TaskEdit: FunctionComponent<ITaskOwnProps> = ({ task = emptyTask, onClose, onSave, className }) => {
  const [ errors, setErrors ] = useState<string[]>([])
  const [ taskUpdate, setTaskUpdate ] = useState(task)
  const update = (key: string, value: unknown) => setTaskUpdate({ ...taskUpdate, [ key ]: value })

  return (
    <div className={[ taskUpdate.priority, 'task', className ].join(' ')}>
      <div className="summary">
        <span>Summary</span>
        <textarea
          className="text-edit"
          value={taskUpdate.tasksummary}
          onChange={v => update('tasksummary', v.target.value)}/>
      </div>
      <div className="task-line">
        {/* Use this Date Picker rather than <input type="datetime-picker"/>
            for better browser support, however this does not support older browsers
            because that was not a requirement in the spec
            */}
        <label>Incident time <DateTimePicker
          onChange={(d: Date) => update('timestamp', d)}
          value={taskUpdate.timestamp}
          disableClock={true}
          clearIcon={null}
        />
        </label>
        <label>Status <select
          value={taskUpdate.taskStatus ?? 'none'}
          onChange={v => update('taskStatus', v.target.value)}>
          <option disabled value="none"> -- select an option --</option>
          {availableStatuses.map(v => <option value={v}>{v}</option>)}
        </select>
        </label>
        <label>Priority <select
          value={taskUpdate.priority ?? 'none'}
          onChange={v => update('priority', v.target.value as PriorityEnum)}>
          <option disabled value="none"> -- select an option --</option>
          {availablePriorities.map(v => <option value={v}>{v}</option>)}
        </select>
        </label>
      </div>
      <div className="task-line">
        <label>Vehicle ID <input
          type="text"
          onChange={v => update('assignedto', v.target.value)}
          value={taskUpdate.assignedto}/></label>
        <label>Latitude <input
          className="latlon-input"
          type="number" max={180} min={-180}
          onChange={v => update('latitude', v.target.value as unknown as number)}
          value={taskUpdate.latitude}/></label>
        <label>Longitude <input
          className="latlon-input"
          type="number" max={90} min={-90}
          onChange={v => update('longitude', v.target.value as unknown as number)}
          value={taskUpdate.longitude}/></label>
      </div>
      <div className="summary">
        Description <textarea
        className="text-edit description"
        value={taskUpdate.taskdescription}
        onChange={v => update('taskdescription', v.target.value)}/>
      </div>

      {!!errors.length && <>
          <p className="danger-text">Please fix these errors before saving:</p>
        {errors.map((errorMessage, i) => <p key={i} className="danger-text">{errorMessage}</p>)}
      </>}

      <div className="task-line">
        <TaskButton halfSize={true} className={'cancel-button'} onClick={onClose}>
          Cancel
        </TaskButton>
        <TaskButton halfSize={true} onClick={() => {
          const validationErrors = validateTask(taskUpdate)
          if (validationErrors.length) {
            setErrors(validationErrors)
            return
          }
          /* Can't set organisation; no endpoint for list of organisation */
          /* Can't set caller; no endpoint for caller list */
          const newTask: ITask = {
            // add in the data that would ordinarily be provided by the backend
            // and filled back in the state by the response
            abxTaskId: 123,
            organisationTaskId: 321,
            organisationId: 3,
            ...taskUpdate
          } as ITask
          onSave(newTask)
        }}>
          {'abxTaskId' in taskUpdate ? 'Update Task' : 'Create Task'}
        </TaskButton>
      </div>
    </div>
  )
}
