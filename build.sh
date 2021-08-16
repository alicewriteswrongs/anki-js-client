#!/bin/bash

# clear out old stuff
rm -rf build/*

# Copy over our static content
cp public/* build
cp src/index.css build

# run it!
./node_modules/.bin/esbuild \
    --bundle \
    --outfile=build/index.js \
    --minify \
    src/index.tsx
