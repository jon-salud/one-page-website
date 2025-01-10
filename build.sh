#!/bin/bash

# Create the deployable folder if it doesn't exist
mkdir -p docs

# Copy HTML, CSS, and JS files to the deployable folder
cp src/index.html docs/
cp src/styles.css docs/
cp src/script.js docs/
cp -r src/data docs/