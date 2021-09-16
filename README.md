# Firetrend

## Workflow

ng serve // for a dev server
ng build // `dist/` directory. Use the `--prod` flag for a production build
ng test // execute the unit tests via [Karma](https://karma-runner.github.io)
ng e2e // tests via [Protractor](http://www.protractortest.org/)
npm run build // to build your project for Firebase Hosting and Cloud Functions
firebase serve // To test, spin up the emulator
firebase deploy

## Getting Started

```txt
>ng new firetrend
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss
ng add @angular/fire
```

[Deploy your application on Firebase Hosting & Functions](https://github.com/angular/angularfire/blob/master/docs/deploy/getting-started.md)

Not doing this as of yet.  This project was started erronously at first with ng cli set at 9, so moving to version 12 and starting again.

## [Getting started with AngularFire and Universal](https://github.com/angular/angularfire/blob/master/docs/universal/getting-started.md)

```txt
>ng generate universal --client-project firetrend
CREATE src/main.server.ts (220 bytes)
CREATE src/app/app.server.module.ts (318 bytes)
CREATE tsconfig.server.json (273 bytes)
UPDATE package.json (1584 bytes)
UPDATE angular.json (4525 bytes)
UPDATE src/main.ts (432 bytes)
UPDATE src/app/app.module.ts (438 bytes)
npm install --save-dev @nguniversal/express-engine @nguniversal/module-map-ngfactory-loader express webpack-cli ts-loader ws xhr2
```

### [Deploying your Universal application on Cloud Functions for Firebase](https://github.com/angular/angularfire/blob/master/docs/universal/cloud-functions.md)

```txt
firebase init
...
? Are you ready to proceed? Yes
? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Functions: Configure
a Cloud Functions directory and its files, Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
=== Project Setup
First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.
? Please select an option: Create a new project
i  If you want to create a project in a Google Cloud organization or folder, please use "firebase projects:create" instead, and return to this command when you've created the project.
? Please specify a unique project id (warning: cannot be modified afterward) [6-30 characters]:
 firetrend
? What would you like to call your project? (defaults to your project ID)
√ Creating Google Cloud Platform project
√ Adding Firebase resources to Google Cloud Platform project
...
=== Functions Setup
A functions directory will be created in your project with sample code
pre-configured. Functions can be deployed with firebase deploy.
? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use ESLint to catch probable bugs and enforce style? Yes
+  Wrote functions/package.json
+  Wrote functions/.eslintrc.js
+  Wrote functions/tsconfig.json
+  Wrote functions/tsconfig.dev.json
+  Wrote functions/src/index.ts
+  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes
...
=== Hosting Setup
Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.
? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
+  Wrote public/404.html
+  Wrote public/index.html
i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...
+  Firebase initialization complete!
```

Rewrites were not added to the firebase.json file, so added it manually:

```json
"hosting": {
    // ...
    "rewrites": [
      { "source": "**", "function": "universal" }
    ]
  }
```

```txt
npm run build
...
> firetrend@0.0.0 copy:hosting C:\Users\timof\repos\timofeysie\angular\firetrend
> cp -r ./dist/firetrend/* ./public && rm ./public/index.html
'cp' is not recognized as an internal or external command,
```

This does not work either:

```txt
> copy -r ./dist/firetrend/* ./public && rmdir ./public/index.html
```

Also tried this:

```json
"copy:hosting": "copy -r \"./dist/firetrend/*\" \"./public\" && rmdir \"./public/index.html\"",
```

The command works in its original for using git bash in VSCode.  But then a different error:

```npm run build
...
Entrypoint server = server.js
[./server.ts] 393 bytes {server} [built] [failed] [1 error]

ERROR in ./server.ts
Module build failed (from ./node_modules/ts-loader/index.js):
TypeError: loaderContext.getOptions is not a function
    at getLoaderOptions (C:\Users\timof\repos\timofeysie\angular\firetrend\node_modules\ts-loader\dist\index.js:91:41)
    at Object.loader (C:\Users\timof\repos\timofeysie\angular\firetrend\node_modules\ts-loader\dist\index.js:14:21)npm ERR! code ELIFECYCLE
```

Looking at this solution after a commit: *I assume you're using ts-loader v9.x then if it is the case I suggest downgrading it to v8.x because this is an issue related to ts-loader and nothing to do with the worker when they migrated to v9*

```txt
npm i ts-loader@8.3.0
...
npm run build
...
> ng run firetrend:server && npm run webpack:ssr
> webpack --config webpack.server.config.js
ts-loader: Using typescript@3.5.3. This version is incompatible with ts-loader. Please upgrade to the latest version of TypeScript.
Hash: 80bd9ef8b1e5e0642ea8
Version: webpack 4.39.2
Time: 6893ms
Built at: 17/09/2021 3:12:21 am
    Asset     Size  Chunks             Chunk Names
server.js  7.5 MiB  server  [emitted]  server
Entrypoint server = server.js
[./dist sync recursive ^\.\/.*\-server\/main$] ./dist sync ^\.\/.*\-server\/main$ 188 bytes {server} [built]       
[./dist/firetrend-server/main.js] 64.8 KiB {server} [optional] [built]
[./node_modules/@angular/core/fesm5/core.js] 1.18 MiB {server} [built] [2 warnings]
[./node_modules/@nguniversal/common/fesm2015/engine.js] 734 KiB {server} [built]
[./node_modules/@nguniversal/express-engine/fesm2015/express-engine.js] 2.56 KiB {server} [built]
[./node_modules/@nguniversal/express-engine/fesm2015/tokens.js] 868 bytes {server} [built]
[./node_modules/@nguniversal/module-map-ngfactory-loader/fesm5/module-map-ngfactory-loader.js] 3.53 KiB {server} [built]
[./node_modules/express/index.js] 224 bytes {server} [built]
[./node_modules/reflect-metadata/Reflect.js] 50 KiB {server} [built]
[./node_modules/ws/index.js] 376 bytes {server} [built]
[./node_modules/xhr2/lib/xhr2.js] 43.2 KiB {server} [built]
[./node_modules/zone.js/dist/zone-node.js] 105 KiB {server} [built]
[./server.ts] 1.64 KiB {server} [built]
[fs] external "fs" 42 bytes {server} [built]
[path] external "path" 42 bytes {server} [built]
    + 429 hidden modules
WARNING in ./node_modules/ws/lib/buffer-util.js
Module not found: Error: Can't resolve 'bufferutil' in 'C:\Users\timof\repos\timofeysie\angular\firetrend\node_modules\ws\lib'
 @ ./node_modules/ws/lib/buffer-util.js
 @ ./node_modules/ws/lib/sender.js
 @ ./node_modules/ws/index.js
 @ ./server.ts
WARNING in ./node_modules/ws/lib/validation.js
Module not found: Error: Can't resolve 'utf-8-validate' in 'C:\Users\timof\repos\timofeysie\angular\firetrend\node_modules\ws\lib'
 @ ./node_modules/ws/lib/validation.js
 @ ./node_modules/ws/lib/sender.js
 @ ./node_modules/ws/index.js
 @ ./server.ts
WARNING in ./node_modules/@angular/core/fesm5/core.js 27316:15-36
System.import() is deprecated and will be removed soon. Use import() instead.
For more info visit https://webpack.js.org/guides/code-splitting/
 @ ./server.ts 4:0-47 14:0-14
WARNING in ./node_modules/@angular/core/fesm5/core.js 27328:15-102
System.import() is deprecated and will be removed soon. Use import() instead.
For more info visit https://webpack.js.org/guides/code-splitting/
 @ ./server.ts 4:0-47 14:0-14
ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\functions\node_modules\google-gax\build\src\index.d.ts  
[tsl] ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\functions\node_modules\google-gax\build\src\index.d.ts(49,10)
      TS1005: 'from' expected.
```

## Original Readme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
