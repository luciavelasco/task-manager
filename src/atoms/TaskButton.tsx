import React, { FunctionComponent, MouseEventHandler } from 'react'
import './TaskButton.css'

interface ITaskButtonOwnProps {
  halfSize?: boolean
  onClick: MouseEventHandler<HTMLDivElement>
  className?: string
}

export const TaskButton: FunctionComponent<ITaskButtonOwnProps> =
  ({ children, className, onClick, halfSize }) =>
    <div className={`button ${halfSize && 'half-size'} ${className}`} onClick={onClick}>{children}</div>

