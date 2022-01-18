# Three client

Janvier 2022

## Installation

```
mkdir three_client
cd three_client/

mkdir -p src/css src/js src/fonts dist
touch src/index.js
touch src/index.html
touch src/css/app.scss

npm init -y

git init .
vim .gitignore
/dist
/node_modules
npm-debug.log
.DS_Store
```


```
git add .
git commit -m "Initial commit"
```

### Dev Packages

```
npm install -D webpack webpack-cli
npm install -D webpack-dev-server html-webpack-plugin
npm install -D mini-css-extract-plugin css-loader sass sass-loader terser-webpack-plugin css-minimizer-webpack-plugin
npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader
npm install -D eslint eslint-plugin-react
npm install -D copy-webpack-plugin
```

### Packages

```
npm i react react-dom react-router-dom
npm i three three-orbitcontrols cannon
```

## Testing

```
cd three_client/
npm i
npm start
```