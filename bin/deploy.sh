#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
SITE_BUILDER_DIR=$SCRIPT_DIR/../site-builder
REMOTE_DIR=$SCRIPT_DIR/../remote
KEY_PATH=$SCRIPT_DIR/../keys/id_rsa_sneck

set -e
set -x
ssh-add -D
ssh-add $KEY_PATH

# Build site
echo "Building site..."
pushd $SITE_BUILDER_DIR
npm run clean
npm run build
if [ -n "$(git status --porcelain)" ]; then 
	echo "Commiting changes and pushing to remote."
	git add -A
	git commit -m "Automated update"
	git push
fi
popd
# Copy contents form site-builder/public to remote/
echo "Copying compiled files..."
rsync -a --delete --force --exclude .git --exclude .gitignore --exclude CNAME --exclude .DS_Store $SITE_BUILDER_DIR/public/ $REMOTE_DIR/
# Push compiled updates to master repo
pushd $REMOTE_DIR
if [ -n "$(git status --porcelain)" ]; then 
	echo "Pushing updates to remote..."
	git add -A
	git commit -m "Automated update"
	git push
	echo "Site was updated!"
else
	echo "Site was unchanged, no files were pushed."
fi
popd