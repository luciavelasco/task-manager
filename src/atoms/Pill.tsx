import React, { FunctionComponent } from 'react'
import './Pill.css'

export const Pill: FunctionComponent = ({ children }) =>
  <span className="pill">
      {children}
    </span>

