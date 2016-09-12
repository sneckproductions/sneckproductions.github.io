import React from 'react'
import { Link } from 'react-router'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Navigation from '../common/Navigation'

export default (props) => (
	<div className="container">
		<div className="visible-xs">
			<Header />
		</div>
		<div className="content content__home">
			<div className="hidden-xs">
				<h1><Link to='/'>sneck productions.</Link></h1>
				<Navigation />
			</div>
			<img src="images/polaroid.jpg" alt="sneck productions." className="img-responsive" />
		</div>
		<div className="visible-xs">
			<Footer><p>&copy; copyright 2016 sneck productions</p></Footer>
		</div>
	</div>
)