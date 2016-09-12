import React from 'react'
import { Link } from 'react-router'
import { GalleryCategory as GalleryCategoryModel } from '../../gallery'
import GalleryImage from './GalleryImage'
import GalleryCover from './GalleryCover'
import crypto from 'crypto'

export default class Category extends React.Component {
	constructor(props) {
		super(props)
		this.handleTitleMouseOver = this.handleTitleMouseOver.bind(this);
		this.handleTitleMouseOut = this.handleTitleMouseOut.bind(this);
	}
	handleTitleMouseOver(e) {
		if (this.props.onTitleMouseOver && this.props.model) {
			this.props.onTitleMouseOver(this.props.model.getId())
		}
	}
	handleTitleMouseOut(e) {
		if (this.props.onTitleMouseOut && this.props.model) {
			this.props.onTitleMouseOut(this.props.model.getId())
		}
	}
	render() {
		let imageElements = []
		for (let image of this.props.model.getImages()) {
			imageElements.push(
				<li key={image.id}>
					<GalleryImage model={image} />
				</li>
			)
		}
		return (
			<div className={'gallery__category' + (this.props.showCover ? ' gallery__category--active' : '')}>
				<h3>
					<Link
						to={this.props.current ? '/photos' : `/photos/${this.props.model.getId()}`}
						onMouseEnter={this.handleTitleMouseOver}
						onMouseLeave={this.handleTitleMouseOut}
					>
						{this.props.model.getTitle()}
					</Link>
				</h3>
				<GalleryCover model={this.props.model.getCover()} />
				{ this.props.current ? <ul className="list-inline gallery__category-list">{imageElements}</ul> : null }
			</div>
		)
	}
}

Category.propTypes = {
	model: React.PropTypes.instanceOf(GalleryCategoryModel),
	current: React.PropTypes.bool,
	showCover: React.PropTypes.bool,
	onTitleMouseOver: React.PropTypes.func,
	onTitleMouseOut: React.PropTypes.func
};