import fs from 'fs'
import lwip from 'lwip'
import mkdirp from 'mkdirp'
import {Gallery, GalleryCategory, GalleryImage} from './gallery'
import galleryImages from '../content/gallery.json'
import galleryOptions from '../content/gallery-config.json'

export default class GalleryPlugin {
	apply(compiler) {
		compiler.plugin('done', () => {
			const galleryWriter = new GalleryWriter(galleryImages, galleryOptions)
			galleryWriter.createThumbnails()
			galleryWriter.createCovers()
		})
	}
}

class GalleryWriter extends Gallery {
	getImageClass() {
		return GalleryImageWriter
	}
	createCacheDir(callback) {
		mkdirp(this.options.base_dir + '/' + this.options.cache_dir, callback);
	}
	createThumbnails() {
		this.createCacheDir((err) => {
			if (err) {
				throw err
			}
			for (let image of this.images) {
				image.createImageSize(this.options.thumbnails.height)
			}
		})
	}
	createCovers() {
		this.createCacheDir((err) => {
			if (err) {
				throw err
			}
			for (let category of this.categories) {
				const image = category.getCover()
				if (image) {
					image.createImageSize(this.options.cover.height)
				}
			}
		})
	}
}

class GalleryImageWriter extends GalleryImage {
	createImageSize(height, ignoreExisting = false) {
		const srcImage = this.options.base_dir + '/' + this.url
		const destImage = this.options.base_dir + '/' + this.getCachePath(height)
		if (!ignoreExisting) {
			try {
				fs.accessSync(destImage, fs.F_OK)
				return Promise.resolve()
			} catch (e) {
				// File does not exist
			}
		}
		return new Promise(function(resolve, reject){  
			lwip.open(srcImage, (err, image) => {
				if (err) {
					console.log(err)
					return reject(err)
				}
				if (!image.width() || !image.height()) {
					console.log('Invalid image dimensions')
					return reject('Invalid image dimensions')
				}
				let width = image.width() * (height / image.height())
				image.batch()
					.resize(width, height)
					.writeFile(destImage, 'jpg', {quality: 60}, (err) => {
						if (err) {
							console.log(err)
							return reject(err)
						}
						resolve()
					})
			})
		})
	}
}