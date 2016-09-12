import React from 'react'
import Navigation from './Navigation'
export default (props) => (
	<footer>
		<Navigation />
		{props.children}
	</footer>
)