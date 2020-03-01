yarn build:example
rm -Rf gh-pages
mkdir -p gh-pages
cd gh-pages
git init .
git remote add origin git@github.com:RobotlegsJS/RobotlegsJS-Pixi.git
cp -r ../dist/* .
git checkout -b gh-pages
git add .
git commit -m "update example build"
git push origin gh-pages --force
