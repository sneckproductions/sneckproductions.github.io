# sneck productions website builder

These scripts build the sneck productions website.

## Setup

The project requires **Node.js** to build to make sure that's installed.

To install the necessary sources and dependencies, run:

    ./bin/install.sh

* The `site-builder` directory contains the project that builds the static site.
* The `remote` directory is the actual build product, you won't need to touch this.

## Update gallery

* Drop new images into `site-builder/public/gallery/`
* Edit `site-builder/content/gallery.json` to include your new images.
* That's it!

To preview locally, enter the `site-builder` directory and run

	npm start

Then point your browser to `http://localhost:8080/`.

## Deploy

To build and deploy the site, run:

	./update.command

Or just double-click the file in the Finder.