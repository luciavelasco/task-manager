import React, { FunctionComponent } from 'react'
import './Label.css'

export interface ILabelOwnProps {
  label: string | number,
  value: string | number
}

export const Label: FunctionComponent<ILabelOwnProps> = ({ label, value }) =>
  <span>
    <span className="label">{label}: </span>
    <span className="value">{value}</span>
  </span>
