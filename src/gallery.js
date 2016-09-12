import crypto from 'crypto'
import galleryImages from '../content/gallery.json'
import galleryOptions from '../content/gallery-config.json'

export class Gallery {
	constructor(data, options) {
		const imageClass = this.getImageClass()
		this.options = options
		this.categories = []
		this.images = []
		this.imagesByCategory = []
		let categoryId = 0
		for (let categoryTitle in data) {
			const category = new GalleryCategory(
				categoryId,
				categoryTitle,
				galleryOptions
			)
			this.categories.push(category);
			this.imagesByCategory[categoryId] = []
			let imageId = 0
			for (const imageData of data[categoryTitle]) {
				const image = new imageClass(
					imageId,
					imageData,
					categoryId,
					galleryOptions
				)
				category.addImage(image)
				this.images.push(image)
				this.imagesByCategory[categoryId].push(image)
				imageId++
			}
			categoryId++
		}
	}
	getImageClass() {
		return GalleryImage
	}
	getCategory(category) {
		return this.categories[category] ? this.categories[category] : null
	}
	getImage(category, image) {
		return this.imagesByCategory[category] ? this.imagesByCategory[category][image] : null
	}
	getNext(categoryId, imageId) {
		const category = this.getCategory(categoryId)
		return category ? category.getNext(imageId) : null
	}
	getPrevious(categoryId, imageId) {
		const category = this.getCategory(categoryId)
		return category ? category.getPrevious(imageId) : null
	}
}

export class GalleryCategory {
	constructor(id, title, options) {
		this.id = id
		this.title = title
		this.images = []
		this.cover = null
	}
	addImage(image) {
		if (image.isCover() || !this.images.length) {
			this.cover = image
		}
		this.images.push(image)
	}
	getId() {
		return this.id
	}
	getTitle() {
		return this.title
	}
	getImages() {
		return this.images
	}
	getCover() {
		return this.cover
	}
	getUrl() {
		return '/photos/' + this.id
	}
	getNext(image) {
		if (!this.images.length)
			return null
		return image < this.images.length - 1 ? this.images[image + 1] : this.images[0]
	}
	getPrevious(image) {
		if (!this.images.length)
			return null
		return image <= 0 ? this.images[this.images.length - 1] : this.images[image - 1]
	}
	getFirst() {
		return this.images.length ? this.images[0] : null
	}
	getLast() {
		return this.images[this.images.length - 1]
	}
}

export class GalleryImage {
	constructor(id, data, categoryId, options) {
		this.id = id
		this.categoryId = categoryId
		this.options = options
		this.url = data.image
		this.cover = !!data.cover
		this.data = data
	}
	isCover() {
		return this.cover
	}
	getImage() {
		return this.url
	}
	getThumbnail() {
		return this.getCachePath(this.options.thumbnails.height)
	}
	getCover() {
		return this.getCachePath(this.options.cover.height)
	}
	getCategoryUrl() {
		return '/photos/' + this.categoryId
	}
	getUrl() {
		return '/photos/' + this.categoryId + '/' + this.id
	}
	getTitle() {
		return this.data.title ? this.data.title : ''
	}
	getDescription() {
		let description = this.data.description ? this.data.description : null
		if (description === null)
			return []
		return typeof(description) == 'string' ? [description] : description
	}
	getImageIdent(height) {
		let separator = '-'
		return this.categoryId + separator + this.id + separator + height
	}
	getCachePath(height) {
		let ident = this.getImageIdent(height)
		let hash = crypto.createHash('md5').update(ident).digest('hex')
		return this.options.cache_dir + '/' + hash + '.jpg'
	}
}

export default new Gallery(galleryImages, galleryOptions)