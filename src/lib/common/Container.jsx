import React from 'react'
import Header from './Header'
import Footer from './Footer'
export default (props) => (
	<div className="container">
		<Header />
		{props.children}
		<Footer><p>&copy; copyright 2016 sneck productions</p></Footer>
	</div>
)