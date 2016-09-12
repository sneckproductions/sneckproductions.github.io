import React from 'react'
import Category from './Category'
import { Gallery as GalleryModel } from '../../gallery'

export default class Gallery extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentCategory: !isNaN(this.props.currentCategory) ? parseInt(this.props.currentCategory) : null,
			currentCategoryCover: 0
		}
		this.mouseOverTimer = null
		this.handleCategoryMouseOver = this.handleCategoryMouseOver.bind(this);
		this.handleCategoryMouseOut = this.handleCategoryMouseOut.bind(this);
	}
	handleCategoryMouseOver(categoryId) {
		if (this.mouseOverTimer) {
			clearTimeout(this.mouseOverTimer)
			this.mouseOverTimer = null
		}
		this.setState({currentCategoryCover: categoryId})
	}
	handleCategoryMouseOut(categoryId) {
		this.mouseOverTimer = setTimeout(() => {
			this.setState({currentCategoryCover: 0})
		}, 1000)
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.currentCategory != this.props.currentCategory) {
			this.setState({
				currentCategory: !isNaN(this.props.currentCategory) ? parseInt(this.props.currentCategory) : null
			})
		}
	}
	componentWillUnmount() {
		if (this.mouseOverTimer) {
			clearTimeout(this.mouseOverTimer)
			this.mouseOverTimer = null
		}
	}
	render() {
		if (!this.props.model) {
			return null
		}
		const categoryElements = []
		const categories = this.props.model ? this.props.model.categories : {}
		for (let i = 0; i < categories.length; ++i) {
			const category = categories[i]
			const current = this.state.currentCategory == category.getId()
			const showCover = (
				this.state.currentCategoryCover == category.getId() &&
				isNaN(this.state.currentCategory)
			)
			categoryElements.push(
				<li key={category.getId()} className={current ? 'current' : ''}>
					<Category
						model={category}
						current={current}
						showCover={showCover}
						onTitleMouseOver={this.handleCategoryMouseOver}
						onTitleMouseOut={this.handleCategoryMouseOut}
					/>
				</li>
			)
		}
		return (
			<ul className="gallery list-unstyled">{categoryElements}</ul>
		)
	}
}

Gallery.propTypes = {
	model: React.PropTypes.instanceOf(GalleryModel),
	currentCategory: React.PropTypes.number
}