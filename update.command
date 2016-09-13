#!/bin/bash

# This ensures the script stops if anything is wrong with the gallery JSON,
# any image is missing, etc.
set -e

# Current dir of this script
CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

# Verify gallery.json and that all images in the gallery exists
node $CURRENT_DIR/bin/verify-gallery.js

# Run deploy script
$CURRENT_DIR/bin/deploy.sh