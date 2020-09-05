import React, { FunctionComponent, useState } from 'react'
import './ExpandBar.css'

export const ExpandBar: FunctionComponent = ({ children }) => {
  const [ isExpanded, setExpansion ] = useState(false)
  return (
    <div className="expand-bar">
      <div className="expand-button" onClick={() => setExpansion(!isExpanded)}>See more</div>
      {isExpanded && <div className="expand-contents">{children}</div>}
    </div>
  )
}

