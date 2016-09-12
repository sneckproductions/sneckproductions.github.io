import React from 'react'
import { Router, Route, Link, IndexRoute, Redirect, useRouterHistory } from 'react-router'
// Create hashHistory without queryKey
import createHashHistory from 'history/lib/createHashHistory'
const history = useRouterHistory(createHashHistory)({ queryKey: false })
// Pages
import PageContact from './pages/Contact'
import PageHome from './pages/Home'
import PageLinks from './pages/Links'
import PagePhotos from './pages/Photos'
// Components
import Container from './common/Container'
// Gallery data
import gallery from '../gallery'
// Page data
const links = require('../../content/links.json')
const contact = require('../../content/contact.json')
// Require css
import css from '../../public/css/main.css'

class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Route name="home" path='/' component={PageHome}/>
				<Route path='/' component={Container}>
					<Route name="photos" path='/photos/:category/:image' component={PagePhotos} model={gallery} />
					<Route name="photos" path='/photos/:category' component={PagePhotos} model={gallery} />
					<Route name="photos" path='/photos' component={PagePhotos} model={gallery} />
					<Route name="links" path='/links' component={PageLinks} model={links} />
					<Route name="contact" path='/contact' component={PageContact} model={contact} />
					<Redirect from='*' to='/' />
				</Route>
			</Router>
		)
	}
}

export default App