import React from 'react'
import Gallery from '../gallery/Gallery'
import Fullscreen from '../gallery/Fullscreen'
export default class Photos extends React.Component {
	render() {
		const galleryModel = this.props.route.model
		const categoryId = typeof(this.props.params.category) != 'undefined' ? parseInt(this.props.params.category) : null
		const imageId = typeof(this.props.params.image) != 'undefined' ? parseInt(this.props.params.image) : null
		let content = null
		if (categoryId !== null && imageId !== null) {
			content = <Fullscreen model={galleryModel} category={categoryId} image={imageId} />
		}
		else {
			content = <Gallery model={galleryModel} currentCategory={categoryId} />
		}
		return (
			<div className="content content__photo-viewer">
				{content}
			</div>
		)
	}
}