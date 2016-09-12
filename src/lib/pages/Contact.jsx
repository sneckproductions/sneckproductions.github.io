import React from 'react'
export default (props) => {
	const model = props.route.model
	return (
		<div className="content content__contact clearfix">
			<div className="col-sm-4 hidden-xs">
				<img src="images/logo.jpg" alt="" className="img-responsive"/>
			</div>
			<div className="col-sm-8">
				<h3>{model.title}</h3>
				<p>
					{model.content}
					<br />
					<a href={'mailto:' + model.email}>{model.email}</a>
				</p>
			</div>
		</div>
	)
}