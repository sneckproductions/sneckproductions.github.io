import React from 'react'
import { Link } from 'react-router'
export default (props) => (
	<nav>
		<ul className="list-inline">
			<li><Link to='/photos'>photos</Link></li>
			<li><Link to='/links'>links</Link></li>
			<li><Link to='/contact'>contact</Link></li>
		</ul>
	</nav>
)