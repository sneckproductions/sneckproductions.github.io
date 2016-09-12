import React from 'react'
import { Link, browserHistory } from 'react-router'
import Category from './Category'
import GalleryImage from './GalleryImage'
import { Gallery as GalleryModel } from '../../gallery'

export default class Fullscreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			imageLoaded: false,
			hover: false
		}
		this.image = new Image()
		this.image.onload = () => {
			this.setState({imageLoaded: true})
		}
		this.mouseOverTimer = null
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}
	onKeyUp(e) {
		switch (e.which) {
			case 27:
				/*const gallery = this.props.model
				const image = gallery.getImage(this.props.category, this.props.image)
				browserHistory.push('#'+image.getCategoryUrl())*/
				break
		}
	}
	componentDidMount() {
		window.addEventListener('keyup', this.onKeyUp, false);
	}
	componentWillUnMount(){
		window.removeEventListener('keyup', this.onKeyUp);
		if (this.mouseOverTimer) {
			clearTimeout(this.mouseOverTimer)
			this.mouseOverTimer = null
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.category != this.props.category ||
			prevProps.image != this.props.image) {
			this.setState({imageLoaded: false})
		}
	}
	loadImage(imageUrl) {
		this.image.src = imageUrl
	}
	onMouseEnter(e) {
		if (this.mouseOverTimer) {
			clearTimeout(this.mouseOverTimer)
			this.mouseOverTimer = null
		}
		this.setState({hover: true})
	}
	onMouseLeave(e) {
		this.mouseOverTimer = setTimeout(() => {
			this.setState({hover: false})
		}, 2000)
	}
	render() {
		if (!this.props.model) {
			return null
		}
		const gallery = this.props.model
		const image = gallery.getImage(this.props.category, this.props.image)
		const imageUrl = this.state.imageLoaded ? image.getImage() : image.getThumbnail()
		const nextImage = gallery.getNext(this.props.category, this.props.image)
		const previousImage = gallery.getPrevious(this.props.category, this.props.image)
		const descriptionElements = []
		let i = 0
		for (const description of image.getDescription()) {
			descriptionElements.push(<span key={i++}>{description}</span>)
		}
		let className = 'gallery__fullscreen'
		if (!this.state.imageLoaded) {
			this.loadImage(image.getImage());
			className += ' gallery--loading'
		}
		if (this.state.hover) {
			className += ' gallery--hover'
		}
		return (
			<div
				className={className}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<div className="gallery__large-image" style={{ backgroundImage: 'url('+imageUrl+')' }} />
				<div className="gallery__loader"></div>
				{ image.getTitle() ?
					<h3 className="gallery__title">
						<div className="container">{image.getTitle()}</div>
					</h3>
					: null
				}
				{ descriptionElements.length ?
					<h4 className="gallery__description">
						<div className="container">{descriptionElements}</div>
					</h4>
					: null
				}
				<Link ref="previous" to={previousImage.getUrl()} className="gallery__previous">
					<span className="inner">‹</span>
				</Link>
				<Link ref="next" to={nextImage.getUrl()} className="gallery__next">
					<span className="inner">›</span>
				</Link>
				<Link ref="close" to={image.getCategoryUrl()} className="gallery__close">×</Link>
			</div>
		)
	}
}

Fullscreen.propTypes = {
	model: React.PropTypes.instanceOf(GalleryModel).isRequired,
	category: React.PropTypes.number.isRequired,
	image: React.PropTypes.number.isRequired
}