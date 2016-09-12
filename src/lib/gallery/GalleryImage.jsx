import React from 'react'
import { Link } from 'react-router'
import { GalleryImage as GalleryImageModel } from '../../gallery'

export default class GalleryImage extends React.Component {
	render() {
		return (
			<Link to={this.props.model.getUrl()}>
				<img src={this.props.model.getThumbnail()} alt={this.props.model.getTitle()} className="img-responsive" />
			</Link>
		)
	}
}

GalleryImage.propTypes = {
	model: React.PropTypes.instanceOf(GalleryImageModel),
	fullscreen: React.PropTypes.bool,
	onMouseOver: React.PropTypes.func,
	onMouseOut: React.PropTypes.func
};