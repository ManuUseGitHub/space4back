#cleanup
rm -rf output
rm -rf dist
rm -f dist.zip


npm run build
npm i
mkdir -p dist
mv .output dist/output
cp server.js dist/server.js
zip -r dist.zip ./dist/*
mv dist/output output
cp .env output/.env

# cleanup
rm -rf dist
rm -rf .output