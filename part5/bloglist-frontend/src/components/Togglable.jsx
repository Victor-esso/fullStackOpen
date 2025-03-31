import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef( (props , refs) => {
	const [visible , setVisible] = useState(false)

	const hiddenWhenVisible = { display : visible ? 'none' : '' }
	const showWhenVisible = { display : visible ? '' : 'none' }

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

Togglable.propTypes ={
	toggleLabel : PropTypes.string.isRequired,
	children : PropTypes.node.isRequired
}

// FIX ERROR :  3:19  error  Component definition is missing display name  react/display-name
Togglable.displayName = 'Togglable'

export default Togglable