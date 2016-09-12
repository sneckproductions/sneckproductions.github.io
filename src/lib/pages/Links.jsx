import React from 'react'
export default (props) => {
	const model = props.route.model
	const links = model.links
	const linkElements = []
	for (let i = 0; i < links.length; ++i) {
		linkElements.push(
			<li key={i}>
				<a href={links[i].url}>{links[i].title}</a>
			</li>
		)
	}
	return (
		<div className="content content__links">
			<h3>{model.title}</h3>
			<ul className="link-list list-unstyled">{linkElements}</ul>
		</div>
	)
}