import React, { FunctionComponent, MouseEventHandler } from 'react'
import './TaskButton.css'

interface ITaskButtonOwnProps {
  halfSize?: boolean
  onClick: () => any
  className?: string
}

export const TaskButton: FunctionComponent<ITaskButtonOwnProps> =
  ({ children, className, onClick, halfSize }) =>
    <button className={`button ${halfSize ? 'half-size' : ''} ${className}`} onClick={onClick}>{children}</button>
