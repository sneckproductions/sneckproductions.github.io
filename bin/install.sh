#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
SITE_BUILDER_DIR=$SCRIPT_DIR/../site-builder
REMOTE_DIR=$SCRIPT_DIR/../remote
KEY_PATH=$SCRIPT_DIR/../keys/id_rsa_sneck

set -e
ssh-add -D
ssh-add $KEY_PATH

echo "Cloning site builder repo..."
git clone -b site-builder git@github.com:sneckproductions/sneckproductions.github.io.git $SITE_BUILDER_DIR
echo "Cloning site repo..."
git clone -b master git@github.com:sneckproductions/sneckproductions.github.io.git $REMOTE_DIR

pushd $SITE_BUILDER_DIR
echo "Installing site builder..."
npm install
popd

echo "Install done!"