import React, { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef( (props , refs) => {
  const [visible , setVisible] = useState(false)

  const hiddenWhenVisible = {display : visible ? 'none' : ''}
  const showWhenVisible = {display : visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props?.toggleLabel ? props.toggleLabel : (visible ? 'Hide' : 'Show')}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>  
  )
})

export default Togglable