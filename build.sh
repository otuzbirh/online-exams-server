#!/bin/bash
echo "Starting build process..."
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

echo "Installing dependencies..."
npm install

echo "Running babel build..."
npx babel src -d dist

echo "Build completed. Listing dist folder:"
ls -la dist/

echo "Build script finished." 