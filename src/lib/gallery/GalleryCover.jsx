import React from 'react'
import { Link } from 'react-router'
export default (props) => {
	return (
		<div className="gallery__cover-image hidden-xs">
			<Link to={props.model.getCategoryUrl()}>
				<img src={props.model.getCover()} alt="" />
			</Link>
		</div>
	)
}