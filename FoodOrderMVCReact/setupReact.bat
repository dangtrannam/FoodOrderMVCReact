REM--install typescript, react, type definition files and others -------

npm i -D typescript
npm i -D react @types/react
npm i -D react-dom @types/react-dom
npm i -D typescript awesome-typescript-loader source-map-loader
typings install dt~react dt~react-dom --save
npm install
npm link typescript